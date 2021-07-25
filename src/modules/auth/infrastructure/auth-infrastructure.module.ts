import { Module } from '@nestjs/common'
import AuthController from './controllers/auth.controller'
import { AuthApplicationModule } from '../application/auth-application.module'
import { UserApplicationModule } from '../../user/application/userApplication.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './guards/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { AuthenticationService } from './services/authentication.service'

@Module({
  imports: [
    AuthApplicationModule,
    UserApplicationModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthInfrastructureModule {}
