import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse
} from 'cloudinary';
import { FileUpload } from 'graphql-upload';

export const uploadImage = async (
  file: FileUpload
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  const { createReadStream } = file;
  const fileStream = createReadStream();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    fileStream.pipe(stream);
  });
};
