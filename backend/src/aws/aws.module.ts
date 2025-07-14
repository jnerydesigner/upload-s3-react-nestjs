import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { AwsConfigService } from './aws.config';

@Module({
  controllers: [AwsController],
  providers: [AwsService, AwsConfigService],
})
export class AwsModule {}
