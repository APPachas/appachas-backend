import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
//import { GroupID } from '../../../../../core/types'

export type UserDto = User & Document

@Schema({
  timestamps: true,
  versionKey: false,
})
class User {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] })
  groups: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
