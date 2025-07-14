/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AwsService } from '@app/aws/aws.service';
import { PrismaService } from '@app/database/prisma.service';
import { Injectable } from '@nestjs/common';

export interface UploadOutput {
  name: string;
  url: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly awsS3Service: AwsService,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<UploadOutput> {
    const uploadResult = await this.awsS3Service.uploadFile(file);
    const uploadTest = {
      name: uploadResult.name,
      url: uploadResult.url,
    };

    return await this.prisma.imageUploads.create({
      data: uploadTest,
    });
  }

  async listImages(): Promise<UploadOutput[]> {
    return await this.prisma.imageUploads.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
