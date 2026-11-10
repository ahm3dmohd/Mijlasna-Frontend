import { Link } from 'react-router'

function Dashboard({ user }) {
  return (
    <div>
      <div className='welcome'>
        <span className='eyebrow'><span lang='ar'>مرحباً بك</span> · Good to see you</span>
        <h1>Welcome {user.username}</h1>
        <p>You are signed in as <span className='badge'>{user.role}</span></p>
      </div>

      <div className='quick-links'>
        <Link to='/venues' className='quick-link'>
          <h2>Venues</h2>
          <p>Find a place for your next gathering.</p>
        </Link>
        <Link to='/bookings' className='quick-link'>
          <h2>My Bookings</h2>
          <p>Check the status of your bookings.</p>
        </Link>
        <Link to='/me' className='quick-link'>
          <h2>Profile</h2>
          <p>Update your username, email and phone.</p>
        </Link>
        {user.role === 'owner' && (
          <>
            <Link to='/venues/new' className='quick-link'>
              <h2>Create Venue</h2>
              <p>Add a new venue for people to book.</p>
            </Link>
            <Link to='/owner/bookings' className='quick-link'>
              <h2>Venue Bookings</h2>
              <p>See the bookings made on your venues.</p>
            </Link>
          </>
        )}
        {user.role === 'admin' && (
          <Link to='/users' className='quick-link'>
            <h2>Manage Users</h2>
            <p>View, edit and delete user accounts.</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Dashboard
