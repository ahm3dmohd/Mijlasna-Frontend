import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import VenuesPage from "./pages/Venues/VenuesPage";
import { logout } from "./services/authService";
import MyBookingsPage from "./pages/bookings/MyBookingsPage";
import BookingDetailsPage from "./pages/bookings/BookingDetailsPage";
import EditBookingPage from "./pages/bookings/EditBookingPage";
import ManageUsersPage from "./pages/Admin/ManageUsersPage";
import UserDetailsPage from "./pages/Admin/UserDetailsPage";
import EditUserPage from "./pages/Admin/EditUserPage";

// read the user from the saved token (outside App so it only runs when called)
function getUserFromToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // the token expired, so the user has to sign in again
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return payload;
  } catch {
    // the token is broken, so remove it
    localStorage.removeItem("token");
    return null;
  }
}

function App() {
  const [user, setUser] = useState(getUserFromToken());

  function handleLogout() {
    logout();
    setUser(null);
  }

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage setUser={setUser} />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/sign-in" />}
        />
        <Route path="/me" element={user ? <MyProfile handleLogout={handleLogout} /> : <Navigate to="/sign-in" />}
        />
        <Route path="/me/edit" element={user ? <EditProfile /> : <Navigate to="/sign-in" />}
        />
        <Route path="/bookings" element={user ? <MyBookingsPage /> : <Navigate to="/sign-in" />}
        />
        <Route path="/bookings/:id" element={user ? <BookingDetailsPage /> : <Navigate to="/sign-in" />}
        />
        <Route path="/bookings/:id/edit" element={user ? <EditBookingPage /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/users"
          element={user ? <ManageUsersPage /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/users/:id"
          element={user ? <UserDetailsPage /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/users/:id/edit"
          element={user ? <EditUserPage /> : <Navigate to="/sign-in" />}
        />
      </Routes>
      </div>
    </div>
  );
}

export default App;
