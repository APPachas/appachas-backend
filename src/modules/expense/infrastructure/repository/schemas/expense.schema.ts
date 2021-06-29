import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

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
  user: string

  @Prop({ required: true })
  group: string
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)
