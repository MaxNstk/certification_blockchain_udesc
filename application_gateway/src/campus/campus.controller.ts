import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CampusService } from './campus.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Campus } from './campus.schema';

@Controller('campus')
export class CampusController {

    constructor(private readonly campusService: CampusService) {}

    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<Campus[]> {
      return await this.campusService.findAll();
    }

    //@UseGuards(AuthGuard)
    //@Get(':campusId')
    async getCampus(@Param('campusId') campusId: number): Promise<Campus>{
        return await this.campusService.findCampus(campusId);
    }

    //@UseGuards(AuthGuard)
    //@Post()
    async createCampus(@Body() createCampusDto: {acronym: string; description: string}): Promise<Campus> {
      return await this.campusService.createCampus(createCampusDto.acronym, createCampusDto.description);
    }

}
