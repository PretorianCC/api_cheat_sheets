import { HttpStatus, Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/login.dto";
import { UserResponceInterface } from "./types/userResponce.interface";
import { UserEntity } from "./user.entity";
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
    ) {}
  
  /**
   * Создать пользователя.
   * @param createUserDto - данные для создания пользователя.
   * @returns - пользователь.
   */
  async createUser(createUserDto:CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: {email: createUserDto.email}
    });
    const userByUsername = await this.userRepository.findOne({
      where: {username: createUserDto.username}
    });

    if (userByEmail || userByUsername) {
      throw new HttpException('Email or username is busy', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  /**
   * Авторизация пользователя.
   * @param loginUserDto - данные для логина.
   * @returns - пользователь.
   */
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {email: loginUserDto.email},
      select: ['id','username', 'email', 'password']
    });
    if (!user) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isPasswordCorrect = await compare(loginUserDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    delete user.password;
    return user;
  }

  /**
   * Найти пользователя по id.
   * @param id - идентификатор пользователя.
   * @returns - пользователь.
   */
  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({where: {id}})
  }

  /**
   * Сгенерировать JWT.
   * @param user - пользователь.
   * @returns - токен.
   */
  generateJwt(user: UserEntity): Promise<string> {
    return this.jwtService.signAsync({
      id: user.id,
      username: user.username,
      email: user.email
    });
  }

  /**
   * Ответ, данные пользователя.
   * @param user - пользователь.
   * @returns - пользователь + токен.
   */
  async buildUserResponce(user: UserEntity): Promise<UserResponceInterface> {
    return {
      user: {
        ...user,
        token: await this.generateJwt(user)
      }
    }
  }
}