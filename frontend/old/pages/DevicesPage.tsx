import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Printer } from '../providers/bluetooth/bluetooth';
import { CanvasToBMP } from '../utils/image';

interface DevicesPageProps {

}

async function thing(canvas: HTMLCanvasElement) {
    const printer = new Printer();
    await printer.connect();
    const x = CanvasToBMP.toArrayBuffer(canvas);
    console.log(x);
    await printer.printImage(x);
}

export const DevicesPage: React.FunctionComponent<DevicesPageProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            return;
        }
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(100, 100, 200, 200);
    }, [canvasRef]);

    return (
        <>
            <div>
                <canvas ref={canvasRef} width={384} height={240}></canvas>
                <Button onClick={() => {
                    if (canvasRef.current === null) {
                        return;
                    }
                    thing(canvasRef.current);
                }}
                >hello
                </Button>
            </div></>
    )
}
