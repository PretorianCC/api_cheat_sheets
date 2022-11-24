import { Controller, Get } from "@nestjs/common";
import { TagService } from "./tag.service";

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<{tags: String[]}> {
    const tags = await this.tagService.findAll();
    return {
      tags: tags.map(tags => tags.name)
    }
  }
}