// https://github.com/bitbank2/Thermal_Printer/blob/master/src/Thermal_Printer.cpp

import { checksumTable, setDrawingMode, ucFont, ucMirror } from './constants';
import { logoBmp } from './test';

function checkSum(pData: Uint8Array, iLen: number) {
  let cs = 0;
  for (let i = 0; i < iLen; i++) {
    // eslint-disable-next-line no-bitwise
    cs = checksumTable[(cs ^ pData[i])];
  }
  return cs;
}

let pBackBuffer = new Uint8Array(48 * 384);
let bbWidth = 0; let bbHeight = 0; let bbPitch = 0;
const width = 384;
const height = 240;

function setBackBuffer(pBuffer: Uint8Array, iWidth: number, iHeight: number) {
  pBackBuffer = pBuffer;
  bbWidth = iWidth;
  bbHeight = iHeight;
  bbPitch = (iWidth + 7) >> 3;
}

function loadBmp(pBMP: Uint8Array, bInvert: number, iXOffset: number, iYOffset: number) {
  let i16 = 0;
  let iOffBits = 0; // offset to bitmap data
  let iPitch = 0;
  let cx = 0; let cy = 0; let x = 0; let y = 0;
  let pix = 0;
  let srcmask = 0; let dstmask = 0;
  let flipped = false;

  i16 = pBMP[0] | (pBMP[1] << 8);
  if (i16 !== 0x4d42) {
    // must start with 'BM'
    console.error('file is not a BMP');
    return -1; // not a BMP file
  }

  if (iXOffset < 0 || iYOffset < 0) {
    console.error('offset is incorrect', {
      iXOffset, iYOffset
    });
    return -1;
  }
  cx = pBMP[18] + (pBMP[19] << 8);
  cy = pBMP[22] + (pBMP[23] << 8);
  if (cy > 0) {
    // BMP is flipped vertically (typical)
    flipped = true;
  }

  // too big
  if (cx + iXOffset > bbWidth || cy + iYOffset > bbHeight) {
    console.error('too big', {
      cx, cy, bbWidth, bbHeight
    });
    return -1;
  }
  i16 = pBMP[28] + (pBMP[29] << 8);
  // must be 1 bit per pixel
  if (i16 !== 1) {
    console.error('must be 1 bit per pixel');
    return -1;
  }
  iOffBits = pBMP[10] + (pBMP[11] << 8);
  iPitch = (cx + 7) >> 3; // byte width
  iPitch = (iPitch + 3) & 0xfffc; // must be a multiple of DWORDS

  if (flipped) {
    iOffBits += ((cy - 1) * iPitch); // start from bottom
    iPitch = -iPitch;
  } else {
    cy = -cy;
  }

  // Send it to the gfx buffer
  for (y = 0; y < cy; y++) {
    let sIdx = iOffBits + (y * iPitch);
    let dIdx = Math.floor((iYOffset + y) * bbPitch + iXOffset / 8);

    srcmask = 0x80;
    dstmask = 0x80 >> (iXOffset & 7);
    pix = pBMP[sIdx];
    sIdx += 1;
    if (bInvert) {
      pix = ~pix;
    }

    // do it a bit at a time
    for (x = 0; x < cx; x++) {
      if (pix & srcmask) {
        pBackBuffer[dIdx] |= dstmask;
      } else {
        pBackBuffer[dIdx] &= ~dstmask;
      }
      srcmask >>= 1;

      // next pixel
      if (srcmask === 0) {
        srcmask = 0x80;
        pix = pBMP[sIdx];
        sIdx += 1;
        if (bInvert) {
          pix = ~pix;
        }
      }
      dstmask >>= 1;
      if (dstmask === 0) {
        dstmask = 0x80;
        dIdx += 1;
      }
    } // for x
  } // for y
  return 0;
}

export class Printer {
  testing: boolean = false;

  device: BluetoothDevice | null = null;

  characteristic: BluetoothRemoteGATTCharacteristic | null = null;

  async connect() {
    const printerService = 0xae30;

    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ name: 'GB03' }],
      optionalServices: [printerService],
      acceptAllDevices: false
    });

    if (!this.device.gatt) {
      throw new Error('gatt not defined for device');
    }

    console.log('connecting to', this.device);
    const server = await this.device.gatt.connect();

    console.log(await server.getPrimaryServices());

    console.log('get primary service for server', server);
    const service = await server.getPrimaryService(printerService);

    console.log(service);

    console.log('get characteristic for service', service);
    this.characteristic = await service.getCharacteristic(0xae01);
    console.log('connected');
  }

  async writeData(data: ArrayBuffer) {
    if (this.characteristic === null) {
      console.error('not connected');
      return;
    }

    if (this.testing) {
      return;
    }

    console.log('printing:', data);

    try {
      console.log(await this.characteristic.writeValueWithoutResponse(data));
    } catch (e) {
      console.error(e);
      throw new Error('unable to print');
    }
  }

  async sendByteCommand(command: number, value: number) {
    const buffer = new ArrayBuffer(9);
    const data = new Uint8Array(buffer);
    data.set([0x51, 0x78, 0xCC, 0x00, 0x01, 0x00, 0xDD, 0xC0, 0xFF]);
    // prefix      cmd   dir    length    value  crc   suffix
    data.set([command], 2);				// add requested command
    data.set([value], 6);					// add requested value
    data.set([checksumTable[value]], 7);	// add CRC
    await this.writeData(buffer);
  }

  async printTextLine(str: string) {
    const formattedStr = `${str}\r\n`;

    await this.sendByteCommand(setDrawingMode, 1);					// Derawing mode 1 = Text
    const buffer = new ArrayBuffer(56);
    const data = new Uint8Array(buffer);
    for (let j = 0; j < 8; j++) {
      data[0] = 0x51;
      data[1] = 0x78;
      data[2] = 0xA2; // data, uncompressed
      data[3] = 0;
      data[4] = formattedStr.length; // data length
      data[5] = 0;
      for (let i = 0; i < formattedStr.length; i++) {
        data[6 + i] = ucMirror[ucFont[((formattedStr.charCodeAt(i) - 32) * 8) + j]];
      }
      data[6 + formattedStr.length] = checkSum(data.slice(6), formattedStr.length);
      data[6 + formattedStr.length + 1] = 0xFF;
      // eslint-disable-next-line no-await-in-loop
      await this.writeData(data);
    }
  }

  async printText(str: string) {
    if (this.characteristic === null) {
      try {
        await this.connect();
      } catch (e) {
        console.error(e);
        return;
      }
    }

    await this.sendByteCommand(0xa1, 1);

    await this.printTextLine(str);
  }

  async sendScanLine(line: Uint8Array, len: number) {
    const buffer = new ArrayBuffer(64 + 8);
    const data = new Uint8Array(buffer);
    data[0] = 0x51;
    data[1] = 0x78;
    data[2] = 0xA2; // data, uncompressed
    data[3] = 0;
    data[4] = len;
    data[5] = 0;
    for (let i = 0; i < len; i++) {
      data[6 + i] = ucMirror[line[i]];
    }
    data[6 + len] = 0
    data[6 + len + 1] = 0xFF;
    data[6 + len] = checkSum(data.slice(6), len);
    // eslint-disable-next-line no-await-in-loop
    await this.writeData(data);
  }

  async printImage(image: ArrayBuffer) {
    setBackBuffer(new Uint8Array(48 * 384), width, height);
    
    const bmp = new Uint8Array(image);
    const resp = loadBmp(bmp, 0, 0, 0);
    if (resp !== 0) {
      return;
    }

    await this.sendByteCommand(setDrawingMode, 1);					// Derawing mode 1 = Text

    let idx = 0;

    // Print the graphics
    for (let y = 0; y < bbHeight; y++) {
      // eslint-disable-next-line no-await-in-loop
      await this.sendScanLine(pBackBuffer.slice(idx, idx + bbPitch), bbPitch);
      idx += bbPitch;
    } // for y
  }
}