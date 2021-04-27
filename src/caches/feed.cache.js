const redis = require('redis')
const bluebird = require('bluebird')

const client = redis.createClient()
client.on('error', e => {
  console.error(`redis error: ${e}`)
})

bluebird.promisifyAll(client)

class FeedCache {
  async store(feed) {
    try {
      await client.hsetAsync('feeds:id', [feed.id])
      await client.hsetAsync('feeds:title', [feed.title])
      await client.hsetAsync('feeds:content', [feed.content])
    } catch (e) {
      return null
    }
  }

  async find(id) {
    try {
      return client.hgetAsync('feeds:id', id)
    } catch (e) {
      return null
    }
  }

  async findByTitle(text) {
    try {
      return client.hgetAsync('feeds:title', text)
    } catch (e) {
      return null
    }
  }
}

export default FeedCache