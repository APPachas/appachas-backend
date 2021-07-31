import { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcrypt'

export async function encryptPasswordMiddleware(req: Request, _res: Response, next: NextFunction) {
  const saltOrRounds = 10
  req.body.password = await bcrypt.hash(req.body.password, saltOrRounds)
  next()
}
