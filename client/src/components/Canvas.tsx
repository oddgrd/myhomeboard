import React from 'react';
import Image from 'next/image';
import styles from '../styles/Canvas.module.scss';

interface Props {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | undefined>;
  layoutUrl: string;
}

export const Canvas = ({ canvasRef, layoutUrl }: Props) => {
  return (
    <div className={styles.container}>
      <canvas
        className={styles.canvas}
        ref={canvasRef as any}
        width={350}
        height={478}
      />

      <Image
        className={styles.image}
        width={350}
        height={478}
        quality={90}
        priority={true}
        src={layoutUrl}
        aria-label='Board Image'
      />
    </div>
  );
};
