/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { env } from '@app/common/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsConfigService {
  getS3Config() {
    return {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_REGION,
      bucketName: env.AWS_BUCKET_NAME,
    };
  }
}
