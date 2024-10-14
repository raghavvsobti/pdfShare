import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './auth/auth.model';
import { AuthModule } from './auth/auth.module';
import { PdfModule } from './pdf/pdf.module';
import { AppGateway } from './gateway/app.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb+srv://raghavvsobtii:zMThRtsEGNILuXwN@pdf-share.6ukrq.mongodb.net/?retryWrites=true&w=majority&appName=pdf-share',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PdfModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer
  //     .apply(GetUserMiddleware)
  //     .forRoutes(NotesController, TaskController);
  // }
}
