import React from 'react';
import Image from 'next/image';
import styles from '../styles/Canvas.module.scss';
import { isServer } from '../utils/isServer';
import { buildUrl } from 'cloudinary-build-url';
import { RESIZE_TYPES } from '@cld-apis/utils';
interface Props {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | undefined>;
  layoutUrl: string;
  cloudName: string;
}

export const Canvas = ({ canvasRef, layoutUrl, cloudName }: Props) => {
  const ratio = (!isServer() && Math.ceil(window.devicePixelRatio)) || 1;
  const url = buildUrl(layoutUrl, {
    cloud: {
      cloudName: cloudName
    },
    transformations: {
      dpr: ratio,
      resize: {
        type: RESIZE_TYPES.FILL,
        width: 350,
        height: 478
      }
    }
  });

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
        src={url}
        alt='User Avatar'
      />
    </div>
  );
};
