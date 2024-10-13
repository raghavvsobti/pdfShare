// src/pdf/pdf.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'fs';
import { Pdf } from './schemas/pdf.schema';
import { User } from 'src/auth/auth.model';

@Injectable()
export class PdfService {
  constructor(
    @InjectModel(Pdf.name) private pdfModel: Model<Pdf>,
    @InjectModel('User') private userModel: Model<User & Document>,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadPdf(file: Express.Multer.File): Promise<Pdf> {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      resource_type: 'raw', // For non-image files like PDFs
    });

    console.log(uploadResult, 'uploadResult');

    // Save to MongoDB
    const newPdf = new this.pdfModel({
      url: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
    });

    console.log(newPdf, 'newPdf');
    await newPdf.save();

    // Delete file from local after upload
    unlinkSync(file.path);

    return newPdf;
  }

  async updateUser(updateData: User): Promise<User & Document> {
    const user = await this.userModel.findById(updateData?.id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateData);

    const updatedUser = await user.save();

    return updatedUser;
  }

  async getPdfById(id: string): Promise<Pdf> {
    return this.pdfModel.findById(id).exec();
  }
}
