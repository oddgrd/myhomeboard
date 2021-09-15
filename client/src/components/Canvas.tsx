import React from 'react';
import Image from 'next/image';
import styles from '../styles/Canvas.module.scss';
import { isServer } from '../utils/isServer';
interface Props {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | undefined>;
}

export const Canvas = ({ canvasRef }: Props) => {
  const ratio = (!isServer() && Math.ceil(window.devicePixelRatio)) || 1;
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
        src={`https://res.cloudinary.com/dqyhbqh0x/image/upload/c_scale,h_478,q_100,w_360,dpr_${ratio}.0/v1628264532/covegg19-0_1_0_ziflc1.jpg`}
        alt='User Avatar'
      />
    </div>
  );
};
