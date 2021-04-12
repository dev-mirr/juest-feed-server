import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import UserRepo from '../repositories/user.repository'

export default async (req, res, next) => {
  try {
    req.user = null

    if (req.headers.authorization) {
      let uuid
      jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET,
        (err, payload) => {

          if (err) {
            throw (createError(401, '토큰 정보가 유효하지 않습니다.'))
          }

          uuid = payload.uuid
        }
      )

      console.log('post jwt')
      const userRepo = new UserRepo()
      const user = await userRepo.find(uuid)

      if (!user) {
        throw(createError(404, '사용자를 찾을 수 없습니다.'))
      }

      req.user = user
    }

    next()
  } catch (e) {
    next(e)
  }
}