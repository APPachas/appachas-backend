import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { GroupID, UserID } from '../../../../../core/types'
import * as mongoose from 'mongoose'

export type ExpenseDto = Expense & Document

@Schema({
  timestamps: true,
  versionKey: false,
})
class Expense {
  @Prop({ required: true })
  price: number

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  paymentDate: Date

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserID

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  group: GroupID
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)
