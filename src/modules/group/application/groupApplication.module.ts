import { Module } from '@nestjs/common'
import { DomainModule } from '../domain/domain.module'
import { MongooseModule } from '@nestjs/mongoose'
import GroupRepositoryMongo from '../infrastructure/repository/group.repository.mongo'
import GroupFactory from './factory/group.factory'
import CreateGroupUseCase from './createGroup.useCase'
import FindGroupUseCase from './findGroup.useCase'
import FindAllGroupsUseCase from './findAllGroups.useCase'
import UpdateGroupUseCase from './updateGroup.useCase'
import DeleteGroupUseCase from './deleteGroup.useCase'
import { GROUP_REPOSITORY } from '../../../core/types'
import { GroupSchema } from '../infrastructure/repository/schemas/group.schema'

@Module({
  imports: [
    DomainModule,
    MongooseModule.forFeature([
      {
        name: 'Group',
        schema: GroupSchema,
      },
    ]),
  ],
  providers: [
    GroupFactory,
    CreateGroupUseCase,
    FindGroupUseCase,
    FindAllGroupsUseCase,
    UpdateGroupUseCase,
    DeleteGroupUseCase,
    {
      provide: GROUP_REPOSITORY,
      useClass: GroupRepositoryMongo,
    },
  ],
  exports: [
    GroupFactory,
    CreateGroupUseCase,
    FindGroupUseCase,
    FindAllGroupsUseCase,
    UpdateGroupUseCase,
    DeleteGroupUseCase,
  ],
})
export class GroupApplicationModule {}
