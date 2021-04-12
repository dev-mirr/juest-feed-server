import httpStatus from 'http-status'
import createError from 'http-errors'
import UserRepo from '../../repositories/user.repository'

const get = async (req, res, next) => {
  try {
    const userRepo = new UserRepo()

    if (req.params.uuid) {
      const user = await userRepo.find(req.params.uuid)

      if (!user) {
        throw (createError(httpStatus.NOT_FOUND, '사용자를 찾을 수 없습니다.'))
      }

      return res
        .status(httpStatus.OK)
        .json(user.toWeb())
    } else {
      const users = await userRepo.all()

      return res.json(users.map(user => user.toWeb()))
    }
  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const userRepo = new UserRepo()

    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const user = userRepo.store({
      ...req.body.data,
      createdAt,
      updatedAt,
    })

    if (!user) {
      throw (createError(httpStatus.INTERNAL_SERVER_ERROR, '사용자 등록에 실패 했습니다.'))
    }

    return res
      .status(httpStatus.OK)
      .json({
        code: httpStatus.OK
      })
      //.json(user.toWeb())
  } catch (e) {
    next(e)
  }
}

export {
  get,
  create,
}