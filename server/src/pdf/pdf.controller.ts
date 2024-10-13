import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { extname } from 'path';
import { AuthService } from 'src/auth/auth.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly authService: AuthService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${file.originalname}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf)$/)) {
          return cb(
            new HttpException(
              'Only PDF files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { userId: string },
  ) {
    try {
      const { userId } = body;
      const [pdf, user] = await Promise.all([
        this.pdfService.uploadPdf(file),
        this.authService.findOne({
          _id: userId,
        }),
      ]);
      const pdfsOfUser = user.pdfs;
      user.pdfs = [pdf?.url, ...(pdfsOfUser || [])];
      await this.pdfService.updateUser(user);
      return { url: pdf.url, id: pdf._id, user };
    } catch (error) {
      console.log(error, 'uploadFile');
    }
  }

  @Get('uploaded/:id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const pdf = await this.pdfService.getPdfById(id);
    if (!pdf) {
      throw new HttpException('PDF not found', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(pdf);
  }

  @Get('raghav')
  async getRaghav() {
    return 'hi raghav';
  }
}
