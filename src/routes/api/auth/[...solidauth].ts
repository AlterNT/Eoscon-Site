import Discord from '@auth/core/providers/discord'
import { SolidAuth, SolidAuthConfig } from '@auth/solid-start'
import { EdgeDBAdapter } from '../../../util/auth'
import { Provider } from '@auth/core/providers'
import { getUserByEmail } from '~/util/queries'
import Database from '~/util/database'
import { Session } from '@auth/core/types'

export interface SiteSession extends Session {
  isAdmin: boolean
}

export const authOpts: SolidAuthConfig = {
  adapter: EdgeDBAdapter(),
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }) as Provider,
  ],
  callbacks: {
    session: async ({ session, user }) => {
      const res = await getUserByEmail(Database.getClient(), {
        email: user.email,
      })
      session.user.isAdmin = res?.is_admin

      return session
    },
  },
  pages: {},
}

export const { GET, POST } = SolidAuth(authOpts)
