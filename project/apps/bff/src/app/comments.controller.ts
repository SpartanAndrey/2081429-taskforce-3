import { Body, Controller, Post, Get, UseFilters, Param, Query, Delete, UseGuards, UseInterceptors, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthorInterceptor } from './interceptors/check-author.interceptor';
import { CommentQuery } from './query/comment.query';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('create')
  public async create(@Body() createCommentDto: CreateCommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/create`, createCommentDto);
    
    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment has been successfully deleted.'
  })
  @Delete('/:id')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CheckAuthorInterceptor)
  async destroy(@Param('id') id: number) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/${id}`);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'The comments for task found.'
  })
  @Get('task/:taskId')
  public async getByTask(@Param('taskId') taskId: number, @Query() query: CommentQuery ) {
    
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/task/${taskId}`, {params: query});
 
    return data;
  }

}
