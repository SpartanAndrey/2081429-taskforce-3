import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors, ForbiddenException, BadRequestException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CustomeridInterceptor } from './interceptors/customerid.interceptor';
import { CreateReviewDto } from './dto/create-review.dto';
import { TaskStatus } from '@project/shared/app-types';
import { TASK_HAS_REVIEW, TASK_NOT_COMPLETED, TASK_NOT_OWNER } from './bff.constant';
import { ReviewRdo } from './rdo/review.rdo';

@ApiTags('reviews')
@Controller('reviews')
@UseFilters(AxiosExceptionFilter)
export class ReviewsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CustomeridInterceptor)
  @Post('create')
  public async create(@Body() createReviewDto: CreateReviewDto) {

    const review = (await this.httpService.axiosRef.post(`${ApplicationServiceURL.Reviews}/create`, createReviewDto)).data;

    const task = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${review.taskId}`)).data

    const existReview = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Reviews}/task/${review.taskId}`)).data


    if (review.userId !== task.userId) {
      throw new ForbiddenException(TASK_NOT_OWNER)
    }

    if (task.status !== TaskStatus.Completed) {
      throw new BadRequestException(TASK_NOT_COMPLETED)
    }
    
    if (existReview) {
      throw new ForbiddenException(TASK_HAS_REVIEW)
    }
    
    return review;
  }

}
