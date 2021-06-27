import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Group, GroupDocument } from '../schemas/group.schema'
import { ICreateGroupDto } from '../dto/create-group.dto'
import { IUpdateGroupDto } from '../dto/update-group.dto'

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>) {}

  create(createGroupDto: ICreateGroupDto): Promise<GroupDocument> {
    const group = new this.groupModel(createGroupDto)
    return group.save()
  }

  findAll(): Promise<GroupDocument[]> {
    return this.groupModel.find().exec()
  }

  findOne(id: string): Promise<GroupDocument | null> {
    return this.groupModel.findById(id).exec()
  }

  update(id: string, updateGroupDto: IUpdateGroupDto): Promise<GroupDocument | null> {
    return this.groupModel.findByIdAndUpdate(id, updateGroupDto, { new: true }).exec()
  }

  delete(id: string): Promise<GroupDocument | null> {
    return this.groupModel.findByIdAndDelete(id).exec()
  }
}
