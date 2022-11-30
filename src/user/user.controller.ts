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

  /**
   * Регистрация аккаунта.
   * @param createUserDto - данные регистрации.
   * @returns новый пользователь или ошибка.
   */
   @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponceInterface> {
    const user = await this.userService.createUser(createUserDto);
    return await this.userService.buildUserResponce(user);
  }

  /**
   * Авторизация аккаунта.
   * @param loginUserDto - данные авторизации.
   * @returns - пользователь или ошибка.
   */
  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponceInterface> {
    const user = await this.userService.login(loginUserDto);
    return await this.userService.buildUserResponce(user);
  }

  /**
   * Получить данные пользователя по токену.
   * @param payload - данные пользователя авторизации.
   * @returns - пользователь.
   */
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async currentUser(@UserPayload() payload: UserType): Promise<UserResponceInterface> {
    const user = await this.userService.findById(payload.id);
    return await this.userService.buildUserResponce(user);
  }

  /**
   * Подтверждение почтового ящика аккаунта.
   * @param token токен подтверждение почты.
   * @returns 
   * @Get('confirm')
   * A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11
   */

  /**
   * Получение токена на востановление пароля.
   * @param param0 данные востановления пароля.
   * @returns 
   * @Post('restore')
   */

  /**
   * Страница изменения пароля.
   * @Get('restore')
   */

   /**
    * Смена пароля.
    * @Post('change')
    */

}