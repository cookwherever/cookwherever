export const CanvasToBMP = {

  /**
   * Convert a canvas element to ArrayBuffer containing a BMP file
   * with support for 32-bit (alpha).
   *
   * Note that CORS requirement must be fulfilled.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element to convert
   * @return {ArrayBuffer}
   */
  toArrayBuffer(canvas: HTMLCanvasElement): ArrayBuffer {
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('canvas ctx is null');
    }

    const w = canvas.width;
    const h = canvas.height;
    const w4 = w * 4;

    const idata = ctx.getImageData(0, 0, w, h);
    const data32 = new Uint32Array(idata.data.buffer); // 32-bit representation of canvas

    const stride = Math.floor((32 * w + 31) / 32) * 4; // row length incl. padding
    const pixelArraySize = stride * h;                 // total bitmap size
    const fileLength = 122 + pixelArraySize;           // header size is known + bitmap

    const file = new ArrayBuffer(fileLength);          // raw byte buffer (returned)
    const view = new DataView(file);                   // handle endian, reg. width etc.
    let pos = 0; let x; let y = 0; let p; let s = 0; let a; let v;

    // write file header
    setU16(0x4d42);          // BM
    setU32(fileLength);      // total length
    pos += 4;                // skip unused fields
    setU32(0x7a);            // offset to pixels

    // DIB header
    setU32(108);             // header size
    setU32(w);
    setU32(h);        // negative = top-to-bottom
    setU16(1);               // 1 plane
    setU16(1);              // 32-bits (RGBA)
    setU32(3);               // no compression (BI_BITFIELDS, 3)
    setU32(pixelArraySize);  // bitmap size incl. padding (stride x height)
    setU32(2835);            // pixels/meter h (~72 DPI x 39.3701 inch/m)
    setU32(2835);            // pixels/meter v
    setU32(2);
    setU32(0);
    setU32(0x00ffffff);
    setU32(0x00000000);

    // bitmap data, change order of ABGR to BGRA
    while (y < h) {
      p = 0x7a + y * stride; // offset + stride x height
      x = 0;
      while (x < w4) {
        v = data32[s];                     // get ABGR
        s += 1;
        a = v >>> 24;                        // alpha channel
        view.setUint32(p + x, (v << 8) | a); // set BGRA
        x += 4;
      }
      y += 1;
    }

    return file;

    // helper method to move current buffer position
    function setU16(data: number) {view.setUint16(pos, data, true); pos += 2}
    function setU32(data: number) {view.setUint32(pos, data, true); pos += 4}
  },

  /**
   * Converts a canvas to BMP file, returns a Blob representing the
   * file. This can be used with URL.createObjectURL().
   * Note that CORS requirement must be fulfilled.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element to convert
   * @return {Blob}
   */
  toBlob(canvas: HTMLCanvasElement) {
    return new Blob([this.toArrayBuffer(canvas)], {
      type: 'image/bmp'
    });
  },

  /**
   * Converts the canvas to a data-URI representing a BMP file.
   * Note that CORS requirement must be fulfilled.
   *
   * @param canvas
   * @return {string}
   */
  toDataURL(canvas: HTMLCanvasElement) {
    const buffer = new Uint8Array(this.toArrayBuffer(canvas));
    let bs = '';
    for (let i = 0; i < buffer.length; i += 1) {
      bs += String.fromCharCode(buffer[i]);
    }
    return `data:image/bmp;base64,${  btoa(bs)}`;
  }
};