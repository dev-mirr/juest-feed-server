import models from '../models'
import FeedCache from '../caches/feed.cache'
import FeedWrapper from '../wrappers/feed.wrapper'

class FeedRepo {
  constructor() {
    this.feedCache = new FeedCache()
  }

  async store(data) {
    const feed = await models.Feed.create(data)
    await this.feedCache.store(feed)

    return FeedWrapper.create(feed)
  }

  async all() {
    const feeds = await models.Feed.findAll()

    return feeds.map(feed => FeedWrapper.create(feed))
  }

  async find(id) {
    let feed = await models.Feed.find(id)

    if (!feed) {
      // Cache가 존재하지 않으면 DB에서 받아옴
      feed = await models.Feed.findOne({
        where: {
          id: Buffer.from(id, 'hex')
        }
      })
    }

    return FeedWrapper.create(feed)
  }

  async findByText(title) {
    let feed = await this.feedCache.findByText(title)

    if (!feed) {
      feed = await models.Feed.findOne({
        where: {
          title
        }
      })
    }

    return FeedWrapper.create(feed)
  }
}

export default FeedRepo