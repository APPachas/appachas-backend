import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = Expense & Document

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Expense {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)
