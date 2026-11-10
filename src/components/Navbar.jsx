import { Link } from 'react-router'

function Navbar({ user, handleLogout }) {
  return (
    <nav className='navbar'>
      <Link to='/' className='brand'>Mijlasna</Link>
      <Link to='/'>Homepage</Link>
      <Link to='/venues'>Venues</Link>
      {user
      ?
      (<>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/bookings'>My Bookings</Link>
        <Link to='/me'>Profile</Link>
      <button onClick={handleLogout}>Sign Out</button>
      </>) :
      (<>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
      </>)}
    </nav>
  )
}

export default Navbar
