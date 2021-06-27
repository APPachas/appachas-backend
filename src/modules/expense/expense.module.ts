import { Module } from '@nestjs/common'
import { DomainModule } from './domain/domain.module'
import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { ApplicationModule } from './application/application.module'

@Module({
  imports: [DomainModule, InfrastructureModule, ApplicationModule],
})
export class ExpenseModule {}
