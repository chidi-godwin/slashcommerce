import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: this.configService.get<string>('cloudinary.folder') },
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
