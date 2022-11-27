import { Get, Req, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common/decorators";
import { Request } from "express";
import { UserPayload } from "src/decorators/user-payload.decorator";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { UserType } from "./types/user.type";
import { UserResponceInterface } from "./types/userResponce.interface";
import { UserEntity } from "./user.entity";
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
  async currentUser(@Req() request: Request, @UserPayload() payload: UserType): Promise<UserEntity> {
    return this.userService.findById(payload.id);
  }

}