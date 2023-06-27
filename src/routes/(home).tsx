import Countdown from '~/components/countdown'
import Gallery from '~/components/gallery'
import { Panel } from '~/components/panel/panel'
import Statistics from '~/components/statistics'
import './home.scss'

export default function Home() {
  return (
    <main>
      <div class='splash'>
        <h1>
          <img src='images/EOSCON LOGO.svg' alt='EOSCON' draggable='false' />
        </h1>
        <Countdown />
        <Statistics />
        <button class='button'>Register</button>
      </div>
      <Panel title='About'>
        (DESCRIPTION HERE)
        <Gallery />
      </Panel>
    </main>
  )
}
