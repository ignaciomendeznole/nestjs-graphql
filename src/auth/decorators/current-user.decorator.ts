import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../enums/valid-roles.enum';

export const CurrentUser = createParamDecorator(
  (roles: Role[] = [], context: ExecutionContext) => {
    // Get the graphql context
    const ctx = GqlExecutionContext.create(context);

    // Get the user from the context request
    const user = ctx.getContext().req.user;

    // If the user is not defined, throw an error
    if (!user) {
      throw new InternalServerErrorException(
        'No user inside the request - make sure that you are using the AuthGuard',
      );
    }

    // Check if the user has any of the roles passed in the decorator
    if (roles.length > 0) {
      const hasRole = roles.includes(user.role as Role);
      if (!hasRole) {
        throw new UnauthorizedException(
          `You don't have permission to access this resource`,
        );
      }
    }

    return user;
  },
);
