import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../database/entities/campaign.entity';

@Injectable()
export class CampaignsService {
    constructor(
        @InjectRepository(Campaign)
        private campaignsRepository: Repository<Campaign>,
    ) { }

    create(createCampaignDto: any, userId: string) {
        const campaign = this.campaignsRepository.create({
            ...createCampaignDto,
            gameMasterId: userId,
        });
        return this.campaignsRepository.save(campaign);
    }

    findAll(userId: string) {
        return this.campaignsRepository.find({
            where: { gameMasterId: userId },
        });
    }

    findOne(id: string) {
        return this.campaignsRepository.findOne({
            where: { id },
            relations: ['characters', 'npcs', 'items', 'sessions', 'media'],
        });
    }

    update(id: string, updateCampaignDto: any) {
        return this.campaignsRepository.update(id, updateCampaignDto);
    }

    remove(id: string) {
        return this.campaignsRepository.delete(id);
    }
}
