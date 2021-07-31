import { Module } from '@nestjs/common'
import { AuthDomainModule } from '../domain/auth-domain.module'
import ComparePasswordUseCase from './comparePassword.useCase'

@Module({
  imports: [AuthDomainModule],
  providers: [ComparePasswordUseCase],
  exports: [ComparePasswordUseCase],
})
export class AuthApplicationModule {}
