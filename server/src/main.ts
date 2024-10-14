import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.enableCors({
  //   origin: 'http://localhost:5173',
  //   credentials: true,
  // });

  // Enable CORS for all origins
  app.enableCors({
    // origin: ['*'], // Allows all origins
    origin: (origin, callback) => {
      callback(null, true); // Allow all origins
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials if needed (optional)
  });

  await app.listen(3000);
}
bootstrap();
