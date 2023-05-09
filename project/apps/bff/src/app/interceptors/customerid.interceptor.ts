import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';

@Injectable()
export class CustomeridInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    
    if (request.user.role === UserRole.Customer) {
        request.body['userId'] = request.user.sub;

        return next.handle();
    } else {
        throw new ForbiddenException('You are not Customer.');
    }
    
  }
}
