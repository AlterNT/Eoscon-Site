import * as queries from './queries'
import Database from './database'
import { Adapter } from '@auth/core/adapters'

export function EdgeDBAdapter(): Required<Adapter> {
  return {
    async createUser(user) {
      let res = await queries.createUser(Database.getClient(), user)

      if (res) {
        const { is_admin, ...result } = res
        return result
      } else {
        throw new Error('Failed to create user!')
      }
    },
    async getUser(id) {
      let res = await queries.getUser(Database.getClient(), {
        id,
      })

      // No results
      if (!res) return null

      const { is_admin, ...result } = res
      return result
    },
    async getUserByEmail(email) {
      let res = await queries.getUserByEmail(Database.getClient(), {
        email,
      })

      // No results
      if (!res) return null

      const { is_admin, ...result } = res
      return result
    },
    async getUserByAccount(data) {
      let res = await queries.getUserByAccount(Database.getClient(), data)

      // No results
      if (!res) return null

      const { is_admin, ...result } = res
      return result
    },
    async updateUser(user) {
      if (!user.id) {
        throw new Error('No userId provided to update!')
      }

      const data = {
        is_admin: false,
        id: user.id,
        ...user,
      }
      let res = await queries.updateUser(Database.getClient(), data)

      if (!res) {
        throw new Error('No users updated!')
      }

      const { is_admin, ...result } = res
      return result
    },
    async deleteUser(id) {
      let res = await queries.deleteUser(Database.getClient(), { id })

      // No results
      if (!res) return null

      const { is_admin, ...result } = res
      return result
    },
    async linkAccount(data) {
      // Split 'type' off, as it is a reserved word in edgeql.
      const { type, ...rest } = data

      const res = await queries.linkAccount(Database.getClient(), {
        ...rest,
        account_type: type,
      })

      if (res === null) {
        throw new Error('Failed to link account!')
      }
    },
    async unlinkAccount(data) {
      let res = await queries.unlinkAccount(Database.getClient(), data)

      if (res === null) {
        throw new Error('Failed to link account!')
      }
    },
    async createSession(data) {
      let res = await queries.createSession(Database.getClient(), data)

      if (res === null) throw new Error('Failed to create session!')

      const {
        user: { id },
        ...result
      } = res
      return {
        userId: id,
        ...result,
      }
    },
    async getSessionAndUser(sessionToken) {
      let res = await queries.getSessionAndUser(Database.getClient(), {
        sessionToken,
      })

      // No results
      if (res === null) return null

      const {
        user: { is_admin, ...user },
        ...session
      } = res
      return {
        user: user,
        session: {
          userId: user.id,
          ...session,
        },
      }
    },
    async updateSession(data) {
      let res = await queries.updateSession(Database.getClient(), data)

      // No results
      if (!res) return null

      const {
        user: { id },
        ...session
      } = res
      return {
        userId: id,
        ...session,
      }
    },
    async deleteSession(sessionToken) {
      let res
      try {
        res = await queries.deleteSession(Database.getClient(), {
          sessionToken,
        })
      } catch (error) {
        console.error('Failed to delete session!', error)
        return null
      }

      // No results
      if (!res) return null

      const {
        user: { id },
        ...session
      } = res
      return {
        userId: id,
        ...session,
      }
    },
    async createVerificationToken(data) {
      let res = await queries.createVerificationToken(
        Database.getClient(),
        data
      )

      // No results
      if (!res) return null

      return res
    },
    async useVerificationToken(data) {
      let res = await queries.useVerificationToken(Database.getClient(), data)

      // No results
      if (!res) return null

      return res
    },
  }
}

type Valuable<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K]
}
