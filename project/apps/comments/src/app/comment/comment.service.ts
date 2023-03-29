import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentMemoryRepository
  ) {}
  
  public async create(dto: CreateCommentDto) {
    const comment = {...dto, userId: '', createdAt: dayjs('2023-03-26').toDate()};

    const commentEntity = await new CommentEntity(comment);

    return this.commentRepository.create(commentEntity);
  }

  public async getComment(id: string) {
    return this.commentRepository.findById(id);
  }

  public async delete(id: string) {
    return this.commentRepository.destroy(id);
  }

}
