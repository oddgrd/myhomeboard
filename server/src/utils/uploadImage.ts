import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import { __prod__ } from '../constants';

const eagerOptions = {
  width: 'auto',
  dpr: 'auto',
  responsive: 'true',
  crop: 'fill',
  quality: 100,
  fetch_format: 'auto',
  responsive_placeholder: 'blank',
};
export const uploadImage = async (
  file: FileUpload
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  // file is a promise, ignore ts-lint
  const { createReadStream } = await file;
  const fileStream = createReadStream();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        eager: eagerOptions,
        folder: __prod__ ? 'myhomeboard' : 'myhomeboard-dev',
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    fileStream.pipe(stream);
  });
};
