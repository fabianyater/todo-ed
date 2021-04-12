import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/all')
  async getAllTags() {
    return await this.tagService.getAllTags();
  }
}
