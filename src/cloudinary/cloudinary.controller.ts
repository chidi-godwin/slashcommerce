import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';

@Controller('uploads')
@ApiTags('Uploads')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('imageUpload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Upload image',
    description:
      'Upload image to image bucket and retrieve link to be added to products',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Image uploaded successfully',
    content: {
      'application/json': {
        example: {
          status: 'Success',
          message: 'Image uploaded successfully',
          data: {
            secure_url:
              'https://res.cloudinary.com/chidi-godwin/image/upload/v1669812637/slashcommerce/ckcdhyj6ytdbbygds01h.png',
          },
        },
      },
    },
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const { secure_url } = await this.cloudinaryService.uploadImage(file);
    return {
      status: 'Success',
      message: 'Image uploaded successfully',
      data: {
        secure_url,
      },
    };
  }
}
