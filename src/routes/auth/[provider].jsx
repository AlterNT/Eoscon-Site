import { redirect } from 'solid-start/api'
import Database from '~/util/database'
import Discord from '~/util/discord'

export const newAuth = new Map()

/**
 *
 * @param {import("solid-start").APIEvent} obj
 * @returns
 */
export async function GET({ request, params }) {
  const code = new URL(request.url).searchParams.get('code')
  const provider = params.provider

  switch (provider) {
    case 'discord':
      const tokens = await Discord.getAccessToken(
        code,
        request.url.split('?')[0]
      )

      const user = await Discord.getUser(tokens.access_token)

      if (!(await Database.hasAuth(user.id, 'Discord'))) {
        let id = crypto.randomUUID()

        newAuth.set(id, {
          provider: 'Discord',
          token: tokens.access_token,
        })

        console.log(id)

        return redirect(`/login/new?id=${id}`)
      }
      break
    case 'steam':
      break
    default:
      break
  }

  return redirect('/account')
}
