import { Module } from '@nestjs/common'
import { GroupApplicationModule } from '../application/groupApplication.module'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupSchema } from './repository/schemas/group.schema'
import { GroupController } from './controllers/group.controller'

@Module({
  imports: [
    GroupApplicationModule,
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
  ],
  controllers: [GroupController],
})
export class InfrastructureModule {}
