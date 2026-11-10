import { useState } from 'react'
import { Link, NavLink } from 'react-router'

function Navbar({ user, handleLogout }) {
  // on phones the links are hidden until the menu button is pressed
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className='site-header'>
      <nav className='navbar'>
        <Link to='/' className='brand' onClick={closeMenu}>
          <span className='brand-name'>Mijlasna</span>
          <span className='brand-arabic' lang='ar'>مجلسنا</span>
        </Link>

        <button
          type='button'
          className='menu-button'
          aria-label='Menu'
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NavLink is like Link, but it adds the class "active" on the current page */}
        <div className={menuOpen ? 'nav-links open' : 'nav-links'} onClick={closeMenu}>
          <NavLink to='/' end>Home</NavLink>
          <NavLink to='/venues'>Venues</NavLink>
          {user
          ?
          (<>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <NavLink to='/bookings'>My Bookings</NavLink>
            <NavLink to='/me'>Profile</NavLink>
            <button onClick={handleLogout}>Sign Out</button>
          </>) :
          (<>
            <NavLink to='/sign-up'>Sign Up</NavLink>
            <NavLink to='/sign-in'>Sign In</NavLink>
          </>)}
        </div>
      </nav>
      <div className='sadu-band' aria-hidden='true'></div>
    </header>
  )
}

export default Navbar
