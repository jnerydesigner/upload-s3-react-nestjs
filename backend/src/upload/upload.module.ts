import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from '@app/database/prisma.service';
import { AwsConfigService } from '@app/aws/aws.config';
import { AwsService } from '@app/aws/aws.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, PrismaService, AwsService, AwsConfigService],
})
export class UploadModule {}
