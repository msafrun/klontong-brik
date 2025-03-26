import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { comparePassword, hashPassword } from 'src/helpers/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    readonly profilesRepository: Repository<Profile>,
    readonly jwtService: JwtService,
  ) {}

  async register(createProfileDto: CreateProfileDto) {
    const { username, password } = createProfileDto;

    const hash = hashPassword(password);

    const createProfile = await this.profilesRepository.save({
      username,
      password: hash,
    });

    delete createProfile.password;

    return { data: createProfile };
  }

  async login(createProfileDto: CreateProfileDto) {
    const { username, password } = createProfileDto;

    const getUser = await this.profilesRepository.findOne({
      where: {
        username,
      },
    });

    if (!getUser)
      throw new BadRequestException('username or password incorrect!');

    const validatePassword = comparePassword(password, getUser?.password);

    if (!validatePassword)
      throw new BadRequestException('username or password incorrect!');

    const token = await this.jwtService.signAsync({
      id: getUser.id,
      username: getUser.username,
    });

    return {
      data: {
        token,
      },
    };
  }

  async findOne(request: any) {
    const user = request?.user;

    const getUser = await this.profilesRepository.findOne({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return {
      data: getUser,
    };
  }
}
