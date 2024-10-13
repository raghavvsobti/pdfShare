import { Injectable } from '@nestjs/common';
import { User } from './auth.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User & Document>) {}

  async create(data: any) {
    const newUser = new this.userModel(data);
    const result = await newUser.save();
    return result.id;
  }

  async updateUser(
    id: string,
    updateData: Partial<User>,
  ): Promise<User & Document> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateData);

    const updatedUser = await user.save();

    return updatedUser;
  }

  async findOne(condition: any) {
    return this.userModel.findOne(condition);
  }
}
