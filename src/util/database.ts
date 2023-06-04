import { Client, createClient } from 'edgedb'

export default class Database {
  static #client: Client

  static getClient() {
    if (!this.#client) {
      if (process.env.NODE_ENV === 'test') {
        this.#client = createClient({
          database: 'testing',
        })
      } else {
        this.#client = createClient()
      }
    }

    return this.#client
  }
}
