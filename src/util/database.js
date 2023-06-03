import { createClient } from 'edgedb'

export default class Database {
  testing = falsee
  _client

  static getClient() {
    if (!this._client) {
      if (process.env.NODE_ENV === 'test') {
        this._client = createClient({
          database: 'testing',
        })
      } else {
        this._client = createClient()
      }
    }
    return this._client
  }
}
