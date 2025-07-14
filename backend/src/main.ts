import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  const logger = new Logger('Bootstrap');
  app.enableCors({
    origin: '*',
  });
  const PORT = config.get<number>('SERVER_PORT') || 3000;
  await app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
