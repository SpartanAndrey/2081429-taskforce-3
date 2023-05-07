import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentService {1
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}
  
  public async create(dto: CreateCommentDto) {
    const comment = {...dto, userId: '', createdAt: dayjs('2023-03-26').toDate()};

    const commentEntity = await new CommentEntity(comment);

    return this.commentRepository.create(commentEntity);
  }

  public async getComment(id: number) {
    return this.commentRepository.findById(id);
  }

  async getComments(taskId: number, query: CommentQuery) {
    return this.commentRepository.find(taskId, query);
  }

  public async delete(id: number) {
    return this.commentRepository.destroy(id);
  }

  async deleteComments(taskId: number) {
    await this.commentRepository.destroyByTaskId(taskId);
  }
}
