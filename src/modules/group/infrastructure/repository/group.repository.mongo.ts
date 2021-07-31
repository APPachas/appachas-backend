import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { GroupRepository } from '../../domain/ports/group.repository'
import { GroupDto } from './schemas/group.schema'
import Group from '../../domain/group'
import GroupMapper from '../mappers/group.mapper'
import { GroupID, UserID } from '../../../../core/types'

@Injectable()
export default class GroupRepositoryMongo implements GroupRepository {
  constructor(@InjectModel('Group') private readonly groupModel: Model<GroupDto>) {}

  async create(group: Group): Promise<Group> {
    let groupCreated = new this.groupModel(group)
    groupCreated = await groupCreated.save()
    return GroupMapper.toDomain(groupCreated)
  }

  async findAll(userId: UserID): Promise<Group[]> {
    const groups = await this.groupModel.find({ users: userId }).exec()
    return GroupMapper.toDomains(groups)
  }

  async findOne(id: GroupID): Promise<Group | null> {
    const group = await this.groupModel.findById(id).exec()
    return group !== null ? GroupMapper.toDomain(group) : null
  }

  async update(id: GroupID, group: Group): Promise<Group | null> {
    const groupUpdated = await this.groupModel.findByIdAndUpdate(id, group, { new: true }).exec()
    return groupUpdated !== null ? GroupMapper.toDomain(groupUpdated) : null
  }

  async delete(id: GroupID): Promise<Group | null> {
    const groupDeleted = await this.groupModel.findByIdAndDelete(id).exec()
    return groupDeleted !== null ? GroupMapper.toDomain(groupDeleted) : null
  }
}
