import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('fullName') userFullName: string,
    @Body('lastName') userLastName: string,
    @Body('isAdmin') userIsAdmin: boolean,
    @Body('img') userImg: string,
  ) {
    const user = await this.usersService.insertUser(
      userFullName,
      userLastName,
      userIsAdmin,
      userImg,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'User added successfully',
      data: user,
    };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('fullName') userFullName: string,
    @Body('lastName') userLastName: string,
    @Body('isAdmin') userIsAdmin: boolean,
    @Body('img') userImg: string,
  ) {
    const user = await this.usersService.updateUser(
      userId,
      userFullName,
      userLastName,
      userIsAdmin,
      userImg,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      user: user,
    };
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    const isDeleted = await this.usersService.deleteUser(userId);
    if (isDeleted) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    }
  }
}
