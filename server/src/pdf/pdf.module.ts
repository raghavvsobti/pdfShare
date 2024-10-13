// src/pdf/pdf.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfService } from './pdf.service';
import { Pdf, PdfSchema } from './schemas/pdf.schema';
import { PdfController } from './pdf.controller';
import { UserSchema } from 'src/auth/auth.model';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Pdf.name, schema: PdfSchema }]),
  ],
  controllers: [PdfController],
  providers: [PdfService, AuthService, JwtService],
})
export class PdfModule {}
