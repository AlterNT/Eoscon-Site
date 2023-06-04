import Discord from '@auth/core/providers/discord'
import { SolidAuth } from '@solid-auth/next'
import { EdgeDBAdapter } from '../../../util/auth'

/** @type {import('@solid-auth/next').SolidAuthConfig} */
export const authOpts = {
  adapter: EdgeDBAdapter(),
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {},
  },
  pages: {},
}

export const { GET, POST } = SolidAuth(authOpts)
