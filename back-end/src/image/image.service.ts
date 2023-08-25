import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from '../prisma.service';
import { Image } from '@prisma/client';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async create(imageData: CreateImageDto): Promise<Image> {
    return this.prisma.image.create({
      data: {
        title: imageData.title,
        fileName: imageData.fileName,
      },
    });
  }

  async findAll(): Promise<Image[]> {
    return this.prisma.image.findMany();
  }

  async findOne(id: number): Promise<Image | null> {
    return this.prisma.image.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
    return this.prisma.image.update({
      where: {
        id: id,
      },
      data: {
        title: updateImageDto.title,
      },
    });
  }

  async remove(id: number): Promise<Image> {
    const img = await this.prisma.image.findUnique({
      where: { id: id },
    });

    const imagePath = `./back-end/images/${img?.fileName}`;
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully.');
        }
      });
    }
    return this.prisma.image.delete({
      where: {
        id: id,
      },
    });
  }
}
