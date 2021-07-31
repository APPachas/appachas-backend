import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupSchema } from './infrastructure/repository/schemas/group.schema'
import { GroupController } from './infrastructure/controllers/group.controller'
import { DomainModule } from '../group/domain/domain.module'
import { GroupApplicationModule } from './application/groupApplication.module'
import { InfrastructureModule } from '../group/infrastructure/infrastructure.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
    DomainModule,
    GroupApplicationModule,
    InfrastructureModule,
  ],
  controllers: [GroupController],
  providers: [],
})
export class GroupModule {}
