import { Controller, Post, Body } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';

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
}
