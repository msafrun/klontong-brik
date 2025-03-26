import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VARIABLES } from 'src/common/constants/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARIABLES.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(ENV_VARIABLES.JWT_EXPIRES_IN),
        },
      }),
    }),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
