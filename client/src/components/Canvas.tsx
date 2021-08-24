import React from 'react';

interface Props {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | undefined>;
}

export const Canvas = ({ canvasRef }: Props) => {
  return (
    <canvas
      ref={canvasRef as any}
      width={350}
      height={478}
      className='canvas'
    />
  );
};
