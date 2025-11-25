import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(
    @Body() createCharacterDto: CreateCharacterDto,
    @Request() req: RequestWithUser,
  ) {
    return this.charactersService.create(createCharacterDto, req.user.id);
  }

  @Get()
  findAll(
    @Query('campaignId') campaignId?: string,
    @Request() req?: RequestWithUser,
  ) {
    if (campaignId) {
      return this.charactersService.findByCampaign(campaignId);
    }
    if (req) {
      return this.charactersService.findByPlayer(req.user.id);
    }
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}
