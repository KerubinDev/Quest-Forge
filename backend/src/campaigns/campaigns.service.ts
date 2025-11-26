import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
  ) {}

  async create(
    createCampaignDto: CreateCampaignDto,
    gameMasterId: string,
  ): Promise<Campaign> {
    const campaign = this.campaignsRepository.create({
      ...createCampaignDto,
      gameMasterId,
    });
    return this.campaignsRepository.save(campaign);
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignsRepository.find();
  }

  async findByGameMaster(gameMasterId: string): Promise<Campaign[]> {
    return this.campaignsRepository.find({ where: { gameMasterId } });
  }

  async findOne(id: string): Promise<Campaign> {
    const campaign = await this.campaignsRepository.findOne({ where: { id } });
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const campaign = await this.findOne(id);
    Object.assign(campaign, updateCampaignDto);
    return this.campaignsRepository.save(campaign);
  }

  async remove(id: string): Promise<void> {
    const campaign = await this.findOne(id);
    await this.campaignsRepository.remove(campaign);
  }
}
