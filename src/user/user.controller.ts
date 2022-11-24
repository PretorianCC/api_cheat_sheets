import { ValidationPipe } from "@nestjs/common";
import { Body, Controller, Post, UsePipes } from "@nestjs/common/decorators";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/login.dto";
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
}