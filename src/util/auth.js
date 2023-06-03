import * as queries from './queries'
import Database from './database'

/** @return { import("@auth/core/adapters").Adapter } */
export default function EdgeDBAdapter(client, options = {}) {
  return {
    async createUser(user) {
      const { is_admin, ...result } = await queries.createUser(
        Database.getClient(),
        user
      )
      return result
    },
    async getUser(id) {
      const { is_admin, ...result } = await queries.getUser(
        Database.getClient(),
        {
          id,
        }
      )
      return result
    },
    async getUserByEmail(email) {
      const { is_admin, ...result } = await queries.getUserByEmail(
        Database.getClient(),
        {
          email,
        }
      )
      return result
    },
    async getUserByAccount(data) {
      const { is_admin, ...result } = await queries.getUserByAccount(
        Database.getClient(),
        data
      )
      return result?.[0]
    },
    async updateUser(user) {
      const { is_admin, ...result } = await queries.updateUser(
        Database.getClient(),
        user
      )
      return result
    },
    async deleteUser(id) {
      const { is_admin, ...result } = await queries.deleteUser(
        Database.getClient(),
        { id }
      )
      return result
    },
    async linkAccount(data) {
      // Split 'type' off, as it is a reserved word in edgeql.
      const { type, ...rest } = data
      const {
        user: { id },
        account_type,
        ...result
      } = await queries.linkAccount(Database.getClient(), {
        ...rest,
        account_type: type,
      })
      return {
        type: account_type,
        userId: id,
        ...result,
      }
    },
    async unlinkAccount(data) {
      const {
        user: { id },
        account_type,
        ...result
      } = (await queries.unlinkAccount(Database.getClient(), data))[0]
      return {
        type: account_type,
        userId: id,
        ...result,
      }
    },
    async createSession(data) {
      const {
        user: { id },
        ...result
      } = await queries.createSession(Database.getClient(), data)
      return {
        userId: id,
        ...result,
      }
    },
    async getSessionAndUser(sessionToken) {
      const {
        user: { is_admin, ...user },
        ...session
      } = await queries.getSessionAndUser(Database.getClient(), {
        sessionToken,
      })
      return {
        user: user,
        session: {
          userId: user.id,
          ...session,
        },
      }
    },
    async updateSession(data) {
      const {
        user: { id },
        ...session
      } = await queries.updateSession(Database.getClient(), data)
      return {
        userId: id,
        ...session,
      }
    },
    async deleteSession(sessionToken) {
      const {
        user: { id },
        ...session
      } = await queries.deleteSession(Database.getClient(), { sessionToken })
      return {
        userId: id,
        ...session,
      }
    },
    async createVerificationToken(data) {
      return queries.createVerificationToken(Database.getClient(), data)
    },
    async useVerificationToken(data) {
      return (await queries.useVerificationToken(Database.getClient(), data))[0]
    },
  }
}
