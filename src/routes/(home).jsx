import { Title } from 'solid-start'
import Countdown from '~/components/countdown'
import Gallery from '~/components/gallery'
import Statistics from '~/components/statistics'
import './home.scss'

export default function Home() {
  return (
    <main>
      <div class='splash'>
        <img src='images/EOSCON LOGO.svg' alt='EOSCON' draggable='false' />
        <Countdown />
        <Statistics />
        <button class='button'>Register</button>
      </div>
      <div class='panel about'>
        <h1>About</h1>
        (DESCRIPTION HERE)
        <Gallery />
      </div>
    </main>
  )
}
