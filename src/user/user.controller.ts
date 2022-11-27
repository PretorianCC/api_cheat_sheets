import { Get, Req, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common/decorators";
import { Request } from "express";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { UserResponceInterface } from "./types/userResponce.interface";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponceInterface> {
    const user = await this.userService.createUser(createUserDto);
    return await this.userService.buildUserResponce(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponceInterface> {
    const user = await this.userService.login(loginUserDto);
    return await this.userService.buildUserResponce(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async currentUser(@Req() request: Request): Promise<UserResponceInterface> {
    // 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwaSIsImVtYWlsIjoicGlfMjAwMkBtYWlsLnJ1IiwiaWF0IjoxNjY5Mjg5ODM3fQ.ZuCzcfnG4XUJMaCz7W0DJCO94ne5_1qU5Wcz9I6cgsE'
    return 'currentUser' as any
  }

}