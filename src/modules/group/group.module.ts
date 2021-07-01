import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Group, GroupSchema } from './infrastructure/schemas/group.schema'
import { GroupService } from './infrastructure/services/group.service'
import { GroupController } from './infrastructure/controllers/group.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
