import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}
  
  public async create(dto: CreateCommentDto) {
    const comment = {...dto, createdAt: dayjs().toDate()};

    const commentEntity = await new CommentEntity(comment);

    return this.commentRepository.create(commentEntity);
  }

  public async getComment(id: number) {
    return this.commentRepository.findById(id);
  }

  async getComments(query: CommentQuery, taskId?: number) {
    return this.commentRepository.find(query, taskId);
  }

  async getCommentsByIds(ids: number[]) {
    return this.commentRepository.findByIds(ids);
  }

  public async delete(id: number) {
    return this.commentRepository.destroy(id);
  }

  async deleteComments(taskId: number) {
    await this.commentRepository.destroyByTaskId(taskId);
  }
}
