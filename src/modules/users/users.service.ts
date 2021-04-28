import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(
    fullName: string,
    lastName: string,
    isAdmin: boolean,
    img: string,
  ) {
    const newUser = new this.userModel({
      fullName,
      lastName,
      isAdmin,
      img,
    });
    const result = await newUser.save();
    return result;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      img: user.img,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      fullName: user.fullName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      img: user.img,
    };
  }

  async updateUser(
    userId: string,
    fullName: string,
    lastName: string,
    isAdmin: boolean,
    img: string,
  ) {
    const updatedUser = await this.findUser(userId);
    if (fullName) {
      updatedUser.fullName = fullName;
    }
    if (lastName) {
      updatedUser.lastName = lastName;
    }
    if (isAdmin) {
      updatedUser.isAdmin = isAdmin;
    }
    if (img) {
      updatedUser.img = img;
    }
    updatedUser.save();
    return updatedUser;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
    return true;
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
