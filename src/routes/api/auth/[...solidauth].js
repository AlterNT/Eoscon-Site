import Discord from '@auth/core/providers/discord'
import { SolidAuth } from '@solid-auth/next'

export const authOpts = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
}

export const { GET, POST } = SolidAuth(authOpts)
