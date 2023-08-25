import { Prisma } from '@prisma/client';

export class Image implements Prisma.ImageCreateInput {
  id: number;
  title: string;
  fileName: string;
}
