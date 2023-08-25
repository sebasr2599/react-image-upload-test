import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from '../image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const path = join(__dirname, '../..', '/back-end/images');

@Module({
  imports: [
    ImageModule,
    ServeStaticModule.forRoot({
      rootPath: path,
      // serveRoot: '/images', // URL prefix for serving static files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
