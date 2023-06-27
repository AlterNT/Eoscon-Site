import Auth from '@auth/core'

declare module '@auth/core/types' {
  interface Session {
    user: {
      isAdmin?: boolean
    } & DefaultSession['user']
  }
}
