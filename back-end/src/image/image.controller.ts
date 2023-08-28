import 'multer';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  NotFoundException,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  //Create image
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './back-end/images', // path whare save the files
        filename: (_, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`); // return only file name
        },
      }),
    })
  )
  async create(
    @Query('title') title: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      })
    )
    file: Express.Multer.File
  ): Promise<Image> {
    console.log(file);
    const imgData: CreateImageDto = {
      title: title,
      fileName: file.filename,
    };
    return this.imageService.create(imgData);
  }

  //Get list of images
  @Get()
  async findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  // Read individual image
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Image | null> {
    return this.imageService.findOne(+id);
  }

  @Get('img/:fileName')
  getImage(@Param('fileName') fileName: string) {
    let imagePath = `./back-end/images/${fileName}`;
    if (fs.existsSync(imagePath)) {
      console.log('the image exists');
      imagePath = `http://localhost:3000/${fileName}`;
    } else {
      throw new NotFoundException();
    }
    return { fileURL: imagePath };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto
  ): Promise<Image> {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Image> {
    return this.imageService.remove(+id);
  }
}
