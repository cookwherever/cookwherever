import React, { useCallback, useEffect, useRef, useState } from 'react'

// eslint-disable-next-line import/no-duplicates
import ReactCrop from 'react-image-crop';
// eslint-disable-next-line import/no-duplicates
import { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { createWorker } from 'tesseract.js';

async function generateDownload(
  setProgress: React.Dispatch<React.SetStateAction<string>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  worker: Tesseract.Worker, canvas: HTMLCanvasElement | null,
  crop: Crop | null,
) {
  if (!crop || !canvas) {
    return;
  }

  try {
    canvas.toBlob(
      async (blob) => {
        if (blob === null) {
          return;
        }

        setProgress('loading tesseract...');

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        // @ts-ignore
        blob.name = 'test.jpg';
        setProgress('recognizing text...');
        const { data: { text } } = await worker.recognize(blob);
        setProgress('completed analysis');
        setText(text);
        console.log(text);
        await worker.terminate();
      },
      'image/png',
      1,
    );
  } catch (e) {
    console.error(e);
    setProgress('error while performing ocr on text');
  }
}

const ImageCropper = (props: IImageCropperProps) => {
  const { setText, setProgress } = props;

  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  // @ts-ignore
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 30,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const worker = createWorker({
    logger: m => setProgress(JSON.stringify(m)),
  });

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      // @ts-ignore
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const imgCrop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('ctx is null');
    }

    const pixelRatio = window.devicePixelRatio;

    canvas.width = imgCrop.width * pixelRatio * scaleX;
    canvas.height = imgCrop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      imgCrop.x * scaleX,
      imgCrop.y * scaleY,
      imgCrop.width * scaleX,
      imgCrop.height * scaleY,
      0,
      0,
      imgCrop.width * scaleX,
      imgCrop.height * scaleY,
    );
  }, [completedCrop]);

  return (
    <>
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={async () =>
          generateDownload(setProgress, setText, worker, previewCanvasRef.current, completedCrop)}
      >
        Get Image Text
      </button>
      {src && <ReactCrop
        src={src}
        onImageLoaded={onImageLoad}
        crop={crop}
        onChange={(c) => {setCrop(c)}}
        onComplete={(c) => {setCompletedCrop(c)}}
      />}
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
            visibility: 'hidden',
          }}
        />
      </div>
    </>
  )
}
export default ImageCropper

interface IImageCropperProps {
  setText: React.Dispatch<React.SetStateAction<string>>
  setProgress: React.Dispatch<React.SetStateAction<string>>
}
