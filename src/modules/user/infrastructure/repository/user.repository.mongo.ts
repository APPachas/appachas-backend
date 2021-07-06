import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDto } from './schemas/user.schema'
import { UserRepository } from '../../domain/ports/user.repository'
import User from '../../domain/users'
import UserMapper from '../mappers/user.mapper'

@Injectable()
export default class UserRepositoryMongo implements UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDto>) {}

  async createUser(user: User): Promise<User> {
    let userCreated = new this.userModel(user)
    userCreated = await userCreated.save()
    return UserMapper.toDomain(userCreated)
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec()
    return UserMapper.toDomains(users)
  }

  async findUser(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec()
    return user !== null ? UserMapper.toDomain(user) : null
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    const userUpdated = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec()
    return userUpdated !== null ? UserMapper.toDomain(userUpdated) : null
  }

  async deleteUser(id: string): Promise<User | null> {
    const userDeleted = await this.userModel.findByIdAndDelete(id).exec()
    return userDeleted !== null ? UserMapper.toDomain(userDeleted) : null
  }
}
