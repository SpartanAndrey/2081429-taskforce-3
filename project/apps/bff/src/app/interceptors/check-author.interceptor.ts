import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { TASK_NOT_OWNER } from '../bff.constant';

@Injectable()
export class CheckAuthorInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    
    if (request.user.sub !== request.body['userId']) {
      throw new ForbiddenException(TASK_NOT_OWNER);
    } 

    return next.handle();
  }
}