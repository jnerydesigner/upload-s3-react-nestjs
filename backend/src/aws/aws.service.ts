/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { AwsConfigService } from './aws.config';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AwsService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private readonly s3Config: AwsConfigService) {
    const { accessKeyId, bucketName, region, secretAccessKey } =
      this.s3Config.getS3Config();

    this.bucketName = bucketName;
    this.region = region;
    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ name: string; url: string }> {
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFileName = `${randomUUID()}-${Date.now()}.${fileExtension}`;
    const uploadParams = {
      Bucket: this.bucketName,
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      return {
        name: uniqueFileName,
        url: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${uniqueFileName}`,
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${JSON.stringify(error)}`);
    }
  }
}
