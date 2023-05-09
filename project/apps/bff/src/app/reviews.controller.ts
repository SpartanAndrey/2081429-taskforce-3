import { Body, Controller, Post, Get, UseFilters, Param, Query, Delete, UseGuards, UseInterceptors, ForbiddenException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthorInterceptor } from './interceptors/check-author.interceptor';
import { CommentQuery } from './query/comment.query';
import { CustomeridInterceptor } from './interceptors/customerid.interceptor';
import { CreateReviewDto } from './dto/create-review.dto';
import { TaskStatus } from '@project/shared/app-types';

@ApiTags('reviews')
@Controller('reviews')
@UseFilters(AxiosExceptionFilter)
export class ReviewsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CustomeridInterceptor)
  @Post('create')
  public async create(@Body() createReviewDto: CreateReviewDto) {

    const review = (await this.httpService.axiosRef.post(`${ApplicationServiceURL.Reviews}/create`, createReviewDto)).data;

    const task = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${review.taskId}`)).data

    const existReview = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Reviews}/task/${review.taskId}`)).data


    if (review.userId !== task.userId) {
      throw new ForbiddenException('You are not author.')
    }

    if (task.status !== TaskStatus.Completed) {
      throw new BadRequestException('Tha task has not completed yet.')
    }
    
    if (existReview) {
      throw new ForbiddenException('You have already left a review.')
    }
    
    return review;
  }

}
