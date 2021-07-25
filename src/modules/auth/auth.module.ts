import { Module } from '@nestjs/common'
import { AuthInfrastructureModule } from './infrastructure/auth-infrastructure.module'
import { AuthApplicationModule } from './application/auth-application.module'
import { AuthDomainModule } from './domain/auth-domain.module'

@Module({
  imports: [AuthInfrastructureModule, AuthApplicationModule, AuthDomainModule],
})
export class AuthModule {}
