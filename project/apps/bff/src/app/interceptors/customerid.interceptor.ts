import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';
import { USER_NOT_CUSTOMER } from '../bff.constant';

@Injectable()
export class CustomeridInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (request.user.role !== UserRole.Customer) {
      throw new ForbiddenException(USER_NOT_CUSTOMER);
    }
    
    request.body['userId'] = request.user.sub;

    return next.handle();   
  }
}
