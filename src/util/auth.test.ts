import { faker } from '@faker-js/faker'
import { EdgeDBAdapter } from './auth'
import Database from './database'
import { clearDatabase } from './queries'
import { describe, test, afterEach, beforeEach, expect } from '@jest/globals'
import { Adapter } from '@auth/core/adapters'

describe('EdgeDB Database Adapter', () => {
  let adapter: Required<Adapter>

  beforeEach(() => {
    adapter = EdgeDBAdapter()
  })

  const randomUser = () => ({
    name: faker.internet.userName(),
    image: faker.internet.avatar(),
    email: faker.internet.email(),
    emailVerified: new Date(Date.now()),
  })

  const randomAccount = () => ({
    type: faker.helpers.arrayElement(['email', 'oidc', 'oauth']) as
      | 'email'
      | 'oidc'
      | 'oauth',
    provider: faker.company.name(),
    providerAccountId: faker.string.uuid(),
    refresh_token: faker.string.alphanumeric(10),
    access_token: faker.string.alphanumeric(10),
    expires_at: faker.number.int(),
    token_type: faker.helpers.arrayElement(['access', 'refresh']),
    scope: faker.helpers.arrayElement(['admin', 'name', 'test']),
    id_token: faker.string.alphanumeric(10),
    session_state: faker.string.alphanumeric(10),
  })

  const randomSession = () => ({
    sessionToken: faker.string.alphanumeric(10),
    expires: faker.date.future(),
  })

  const randomToken = () => ({
    identifier: faker.string.alphanumeric(10),
    token: faker.string.alphanumeric(10),
    expires: faker.date.future(),
  })

  describe('User Methods', () => {
    test('Create User', async () => {
      const user = randomUser()

      expect(await adapter.createUser(user)).toMatchObject(user)
    })

    test('Get User', async () => {
      const user = randomUser()

      const dbUser = await adapter.createUser(user)

      expect(await adapter.getUser(dbUser.id)).toMatchObject(user)
    })

    test('Get User by Email', async () => {
      const user = randomUser()

      await adapter.createUser(user)

      expect(await adapter.getUserByEmail(user.email)).toMatchObject(user)
    })

    test('Get User by Account', async () => {
      const user = randomUser()
      const account = randomAccount()

      const dbUser = await adapter.createUser(user)
      await adapter.linkAccount({
        userId: dbUser.id,
        ...account,
      })

      expect(
        await adapter.getUserByAccount({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        })
      ).toMatchObject(user)
    })

    test('Update User', async () => {
      const user1 = randomUser()
      const user2 = randomUser()

      const dbuser = await adapter.createUser(user1)
      expect(
        await adapter.updateUser({ ...user2, id: dbuser.id })
      ).toMatchObject(user2)
    })

    test('Delete User', async () => {
      const user = randomUser()
      const account = randomAccount()

      let dbUser = await adapter.createUser(user)

      expect(await adapter.deleteUser(dbUser.id)).toMatchObject(user)
      expect(await adapter.deleteUser(dbUser.id)).toBeNull()

      dbUser = await adapter.createUser(user)
      await adapter.linkAccount({
        userId: dbUser.id,
        ...account,
      })

      expect(await adapter.deleteUser(dbUser.id)).toMatchObject(user)
      expect(
        await adapter.unlinkAccount({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        })
      ).toBeUndefined()
      expect(await adapter.deleteUser(dbUser.id)).toBeNull()
    })
  })

  describe('Account Methods', () => {
    test('Link Account', async () => {
      const user = randomUser()
      const account = randomAccount()

      const dbUser = await adapter.createUser(user)
      expect(
        await adapter.linkAccount({
          userId: dbUser.id,
          ...account,
        })
      ).toBeUndefined()
    })

    test('Unlink Account', async () => {
      const user = randomUser()
      const account = randomAccount()

      const dbUser = await adapter.createUser(user)
      await adapter.linkAccount({
        userId: dbUser.id,
        ...account,
      })
      expect(
        await adapter.unlinkAccount({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        })
      ).toBeUndefined()
    })
  })

  describe('Session Methods', () => {
    test('Create Session', async () => {
      const user = randomUser()
      const session = randomSession()

      const dbUser = await adapter.createUser(user)
      expect(
        await adapter.createSession({ ...session, userId: dbUser.id })
      ).toMatchObject(session)
    })

    test('Get Session and User', async () => {
      const user = randomUser()
      const session = randomSession()

      const dbUser = await adapter.createUser(user)
      await adapter.createSession({ ...session, userId: dbUser.id })

      expect(
        await adapter.getSessionAndUser(session.sessionToken)
      ).toMatchObject({
        user,
        session,
      })
    })

    test('Update Session', async () => {
      const user1 = randomUser()
      const user2 = randomUser()
      const session1 = randomSession()
      const session2 = randomSession()

      const dbUser1 = await adapter.createUser(user1)
      const dbUser2 = await adapter.createUser(user2)
      await adapter.createSession({ ...session1, userId: dbUser1.id })

      const updateData = {
        sessionToken: session1.sessionToken,
        expires: session2.expires,
        userId: dbUser2.id,
      }

      expect(await adapter.updateSession(updateData)).toMatchObject(updateData)
    })

    test('Delete Session', async () => {
      const user = randomUser()
      const session = randomSession()

      const dbUser = await adapter.createUser(user)
      await adapter.createSession({ ...session, userId: dbUser.id })

      expect(await adapter.deleteSession(session.sessionToken)).toMatchObject(
        session
      )
    })
  })

  describe('Token Methods', () => {
    test('Create Verification Token', async () => {
      const token = randomToken()

      expect(await adapter.createVerificationToken(token)).toMatchObject(token)
    })

    test('Use Verification Token', async () => {
      const token = randomToken()

      await adapter.createVerificationToken(token)

      const { expires, ...params } = token

      expect(await adapter.useVerificationToken(params)).toMatchObject(token)
      expect(await adapter.useVerificationToken(params)).toBeNull()
    })
  })

  afterEach(async () => {
    await clearDatabase(Database.getClient())
  })
})
