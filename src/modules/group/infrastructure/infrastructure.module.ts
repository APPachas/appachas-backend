import { Module } from '@nestjs/common'
import { ApplicationModule } from '../application/application.module'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupSchema } from './repository/schemas/group.schema'
import { GroupController } from './controllers/group.controller'

@Module({
  imports: [ApplicationModule, MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }])],
  controllers: [GroupController],
})
export class InfrastructureModule {}
