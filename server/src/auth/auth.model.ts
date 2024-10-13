// import { Schema } from "@nestjs/mongoose";
import { IsMongoId, IsNumber, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  colorIndex: { type: Number, required: true },
  pdfs: { type: Array, required: true },
});

export class User {
  @IsString()
  @IsMongoId()
  id: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsNumber()
  colorIndex: number;
  @IsString()
  pdfs: Array<string>;
}
