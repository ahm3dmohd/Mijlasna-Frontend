import { Link } from 'react-router'
import MajlisArt from '../components/MajlisArt'

function Homepage() {
  return (
    <div>
      <section className='hero'>
        <div className='hero-text'>
          <span className='eyebrow'><span lang='ar'>أهلاً وسهلاً</span> · Welcome</span>
          <h1>Gather where it feels like <span>home</span>.</h1>
          <p>
            Mijlasna helps you find and book a majlis, diwaniya, hall or pool house
            for your next gathering. Pick a date, choose morning or evening, and
            leave the rest to the host.
          </p>
          <div className='actions'>
            <Link to='/venues' className='btn'>Browse Venues</Link>
            <Link to='/sign-up' className='btn-secondary'>Create an Account</Link>
          </div>
        </div>
        <div className='hero-art'>
          <MajlisArt />
        </div>
      </section>

      <section className='section'>
        <h2 className='section-title'>A place for every gathering</h2>
        <p className='section-intro'>Four kinds of venues, each with its own feel.</p>
        <div className='type-grid'>
          <div className='type-card'>
            <span className='type-arabic' lang='ar'>مجلس</span>
            <h3>Mijlas</h3>
            <p>Floor seating and coffee for family and guests.</p>
          </div>
          <div className='type-card'>
            <span className='type-arabic' lang='ar'>ديوانية</span>
            <h3>Diwaniya</h3>
            <p>A relaxed room for evenings with friends.</p>
          </div>
          <div className='type-card'>
            <span className='type-arabic' lang='ar'>قاعة</span>
            <h3>Hall</h3>
            <p>Room for weddings and big celebrations.</p>
          </div>
          <div className='type-card'>
            <span className='type-arabic' lang='ar'>مسبح</span>
            <h3>Pool House</h3>
            <p>A private pool for a day out together.</p>
          </div>
        </div>
      </section>

      <section className='section'>
        <h2 className='section-title'>How it works</h2>
        <p className='section-intro'>Three steps from idea to gathering.</p>
        <ol className='steps'>
          <li>
            <span className='step-number'>1</span>
            <h3>Browse the venues</h3>
            <p>See the type, capacity and the weekday and weekend price of each one.</p>
          </li>
          <li>
            <span className='step-number'>2</span>
            <h3>Pick your date</h3>
            <p>Choose the day and a morning or evening slot that suits you.</p>
          </li>
          <li>
            <span className='step-number'>3</span>
            <h3>Get confirmed</h3>
            <p>The owner confirms your booking. Follow its status in My Bookings.</p>
          </li>
        </ol>
      </section>

      <section className='banner'>
        <div>
          <h2>Own a venue?</h2>
          <p>Sign up as a venue owner to manage your venues and their bookings.</p>
        </div>
        <Link to='/sign-up' className='btn btn-light'>Sign Up as an Owner</Link>
      </section>
    </div>
  )
}

export default Homepage
