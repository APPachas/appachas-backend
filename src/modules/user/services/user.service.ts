import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../schemas/user.schema'
import { ICreateUserDto } from '../dto/create-user.dto'
import { IUpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  create(createUserDto: ICreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto)
    return user.save()
  }

  findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec()
  }

  findOne(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec()
  }

  update(id: string, updateAddonDto: IUpdateUserDto): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, updateAddonDto, { new: true }).exec()
  }

  delete(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
