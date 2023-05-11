import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';
import { USER_NOT_CONTRACTOR } from '../bff.constant';

@Injectable()
export class ContractoridInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (request.user.role !== UserRole.Contractor) {
      throw new ForbiddenException(USER_NOT_CONTRACTOR);
    }
    
    request.body['userId'] = request.user.sub;

    return next.handle();  
  }
}
