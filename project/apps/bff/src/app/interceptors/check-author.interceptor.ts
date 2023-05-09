import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class CheckAuthorInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    
    if (request.user.sub === request.body['userId']) {
        return next.handle();
    } else {
        throw new ForbiddenException('You are not author.');
    }
    
  }
}