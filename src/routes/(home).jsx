import { Title } from 'solid-start'
import Countdown from '~/components/countdown'
import Gallery from '~/components/gallery'
import Statistics from '~/components/statistics'
import './home.scss'

export default function Home() {
  return (
    <main>
      <div class='splash'>
        <h1>EOSCON 3</h1>
        <Countdown />
        <Statistics />
        <button>Register</button>
      </div>
      <div class='panel about'>
        <h1>About</h1>
        (DESCRIPTION HERE)
        <Gallery />
      </div>
    </main>
  )
}
