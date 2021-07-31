import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

export type GroupDto = Group & Document

@Schema({
  timestamps: true,
  versionKey: false,
})
class Group {
  @Prop({ required: true })
  name: string

  @Prop({ default: false })
  isClosed: boolean

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: string[]
}

export const GroupSchema = SchemaFactory.createForClass(Group)
