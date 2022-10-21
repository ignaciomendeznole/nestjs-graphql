import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Override getRequest from Passport Default AuthGuard to get the request from the GraphQL context
   */
  getRequest(context: ExecutionContext) {
    // GraphQL context
    const ctx = GqlExecutionContext.create(context);

    // GraphQL request
    const request = ctx.getContext().req;

    return request;
  }
}
