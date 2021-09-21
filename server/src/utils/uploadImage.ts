import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse
} from 'cloudinary';
import { FileUpload } from 'graphql-upload';

const eagerOptions = {
  width: 350,
  height: 478,
  crop: 'fill',
  dpr: 'auto',
  quality: 100
};
export const uploadImage = async (
  file: FileUpload
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  const { createReadStream } = file;
  const fileStream = createReadStream();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { eager: eagerOptions, folder: 'myhomeboard' },
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
