import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TasksController } from './tasks.controller';
import { CommentsController } from './comments.controller';
import { ReviewsController } from './reviews.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    UsersController,
    TasksController,
    CommentsController,
    ReviewsController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
