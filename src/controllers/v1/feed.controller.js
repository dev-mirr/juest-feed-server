import httpStatus from 'http-status'
import createError from 'http-errors'
import FeedRepo from '../../repositories/feed.repository'

const getAll = async (req, res, next) => {
  try {
    const feedRepo = await feedRepo.all()

    return res
      .status(httpStatus.OK)
      .json(feed.toWeb())

  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const feedRepo = new feedRepo()

    const feed = FeedRepo.store({
      ...req.body.data,
    })

    if (!feed) {
      throw (createError(httpStatus.INTERNAL_SERVER_ERROR, '포스트 생성에 실패했습니다.'))
    }

    return res
      .status(httpStatus.OK)
      .json({
        code: httpStatus.OK
      })
  } catch (e) {
    next(e)
  }
}

export {
  getAll,
  create,
}