import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { GroupID, UserID } from '../../../../../core/types'

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

  @Prop({ required: true })
  user: UserID

  @Prop({ required: true })
  group: GroupID
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)
