import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { PunctuationService } from './punctuation.service';
import { CreatePunctuationDto } from './dtos/createdto';
import { UpdatePunctuationDto } from './dtos/updatedto';

@Controller('punctuation')
export class PunctuationController {
    constructor(
        private readonly punctuationService: PunctuationService
    ) {}

    @Get()
    async getAllPunctuations() {
        return this.punctuationService.findAll();
    }

    @Get(':id_punctuation')
    async getPunctuationById(@Param('id_punctuation', ParseIntPipe) id_punctuation: number) {
        return this.punctuationService.findOne(id_punctuation);
    }

    @Get('person/:person_id')
    async getPunctuationsByPersonId(@Param('person_id', ParseIntPipe) person_id: number) {
        return this.punctuationService.findByPersonId(person_id);
    }

    @Get('community/:community_id')
    async getPunctuationsByCommunityId(@Param('community_id', ParseIntPipe) community_id: number) {
        return this.punctuationService.findByCommunityId(community_id);
    }

    @Get('person/:person_id/stats')
    async getPersonStats(@Param('person_id', ParseIntPipe) person_id: number) {
        return this.punctuationService.getPersonStats(person_id);
    }

    @Get('community/:community_id/stats')
    async getCommunityStats(@Param('community_id', ParseIntPipe) community_id: number) {
        return this.punctuationService.getCommunityStats(community_id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPunctuation(@Body() createPunctuationDto: CreatePunctuationDto) {
        return this.punctuationService.createPunctuation(createPunctuationDto);
    }

    @Put(':id_punctuation')
    async updatePunctuation(
        @Param('id_punctuation', ParseIntPipe) id_punctuation: number,
        @Body() updatePunctuationDto: UpdatePunctuationDto
    ) {
        return this.punctuationService.updatePunctuation(id_punctuation, updatePunctuationDto);
    }

    @Delete(':id_punctuation')
    @HttpCode(HttpStatus.OK)
    async deletePunctuation(@Param('id_punctuation', ParseIntPipe) id_punctuation: number) {
        return this.punctuationService.deletePunctuation(id_punctuation);
    }
}