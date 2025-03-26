import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { AuthGuard } from 'src/guards/auth';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('register')
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.register(createProfileDto);
  }

  @Post('login')
  login(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.login(createProfileDto);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  findOne(@Request() request: any) {
    return this.profilesService.findOne(request);
  }
}
