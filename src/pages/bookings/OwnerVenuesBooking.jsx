import React from 'react'
import { ownerGetBookings } from '../../services/bookingService';
function OwnerVenuesBooking() {
 
   const [bookings, setBookings] = useState([]);
 
   async function getBookings() {
     const res = await ownerGetBookings();
     setBookings(res);
   }
  
   useEffect(() => {
     getBookings();
   }, []);
 
   return (
     <div>
 
       <h1>Owner Bookings</h1>
 
       {bookings.length === 0 ? (
         <p>No bookings made yet</p>
       ) : (
         <ol>
           {bookings.map((oneBooking) => (
             <li key={oneBooking._id}>
               <h2>{oneBooking.venue ? oneBooking.venue.name : "Venue"}</h2>
               <p>Date: {new Date(oneBooking.date).toLocaleDateString()}</p>
               <p>Time of Day: {oneBooking.timeOfDay}</p>
               <p>Total Price: {oneBooking.totalPrice}</p>
               <Link to={`/bookings/${oneBooking._id}`} >See Details</Link>
             </li>
           ))}
         </ol>
       )}
 
     </div>
   );
 }

export default OwnerVenuesBooking
