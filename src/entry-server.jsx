import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import {
  createHandler,
  renderAsync,
  StartServer,
} from 'solid-start/entry-server'
export default createHandler(
  renderAsync((event) => <StartServer event={event} />)
)
