const API = 'https://discord.com/api'

export default class Discord {
  /**
   * Returns a discord access token.
   * @param {String} accessCode
   * @param {String} redirectUrl
   */
  static async getAccessToken(accessCode, redirectUrl) {
    const body = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: accessCode,
      redirect_uri: redirectUrl,
    }).toString()

    let response
    try {
      response = await fetch(API + '/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      })
    } catch (error) {
      console.error('Discord Network Error:', error)
      return
    }

    if (!response.ok) {
      console.error(
        `Discord Response Error ${response.status}:`,
        await response.json()
      )
      return
    }

    return response.json()
  }

  static async refreshAccessToken(refreshToken) {}

  static async getUser(accessToken) {
    let response
    try {
      response = await fetch(API + '/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch (error) {
      console.error('Discord Network Error:', error)
      return
    }

    if (!response.ok) {
      console.error(
        `Discord Response Error ${response.status}:`,
        await response.json()
      )
      return
    }

    return response.json()
  }
}
