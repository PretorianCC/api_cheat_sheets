import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserType } from 'src/user/types/user.type';

export const UserPayload = createParamDecorator(
  (data: UserType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);