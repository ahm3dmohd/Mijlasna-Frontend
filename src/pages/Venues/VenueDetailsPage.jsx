import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  getVenueById,
  deleteVenue,
  getReviews,
  createReview,
  deleteReview,
  getBlockedDates,
  deleteBlockedDate,
} from "../../services/venueService";

// dates are saved at midnight UTC, so they are shown in UTC too
function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, { timeZone: "UTC" });
}

function VenueDetailsPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewError, setReviewError] = useState("");
  const [blockedDates, setBlockedDates] = useState([]);
  const [reviewFormData, setReviewFormData] = useState({
    rating: "",
    comment: "",
  });

  function reviewHandleChange(e) {
    setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function loadPage() {
      try {
        setVenue(await getVenueById(id));
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load venue.");
      }
      try {
        setReviews(await getReviews(id));
      } catch (err) {
        setReviewError(err?.response?.data?.message || "Failed to load reviews.");
      }
      try {
        setBlockedDates(await getBlockedDates(id));
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load blocked dates.");
      }
    }
    loadPage();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      await deleteVenue(id);
      navigate("/venues");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete venue.");
    }
  }

  async function handleDeleteBlockedDate(blockedId) {
    if (!window.confirm("Unblock this date?")) return;
    try {
      await deleteBlockedDate(id, blockedId);
      setBlockedDates(blockedDates.filter((one) => one._id !== blockedId));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete blocked date.");
    }
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    try {
      setReviewError("");
      const created = await createReview(id, {
        rating: Number(reviewFormData.rating),
        comment: reviewFormData.comment,
      });
      setReviews([...reviews, created]);
      setReviewFormData({ rating: "", comment: "" });
    } catch (err) {
      setReviewError(err?.response?.data?.message || "Failed to add review.");
    }
  }

  async function handleDeleteReview(reviewId) {
    if (!window.confirm("Delete your review?")) return;
    try {
      setReviewError("");
      await deleteReview(id, reviewId);
      setReviews(reviews.filter((one) => one._id !== reviewId));
    } catch (err) {
      setReviewError(err?.response?.data?.message || "Failed to delete review.");
    }
  }

  if (error && !venue) {
    return <p className="error">{error}</p>;
  }

  if (!venue) {
    return <p>Loading...</p>;
  }

  // the venue owner (or an admin) can edit and delete this venue and block dates on it
  const canManage = user && (venue.owner === user._id || user.role === "admin");
  // customers and owners can book
  const canBook = user && (user.role === "customer" || user.role === "owner");

  return (
    <main>

      <h1>Venue Details</h1>
      <p className="error">{error}</p>

      <div className="card details">
        {venue.images && (
          <img className="venue-image" src={venue.images} alt={venue.name} />
        )}

        <div className="card-head">
          <h2>{venue.name}</h2>
          <span className="badge">{venue.type}</span>
        </div>

        <dl className="detail-list">
          <div>
            <dt>Description</dt>
            <dd>{venue.description || "No description"}</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{venue.address}</dd>
          </div>
          <div>
            <dt>Capacity</dt>
            <dd>{venue.capacity} guests</dd>
          </div>
          <div>
            <dt>Weekday price</dt>
            <dd>{venue.weekDayPrice} BD</dd>
          </div>
          <div>
            <dt>Weekend price</dt>
            <dd>{venue.weekendPrice} BD</dd>
          </div>
        </dl>

        <div className="actions">
          {canBook && (
            <button onClick={() => navigate(`/venues/${id}/book`)}>Book Venue</button>
          )}

          {canManage && (
            <>
              <button onClick={() => navigate(`/venues/${id}/edit`)}>Edit Venue</button>
              <button className="btn-danger" onClick={handleDelete}>Delete Venue</button>
            </>
          )}
        </div>
      </div>

      <section className="venue-section">
        <div className="page-head">
          <h2>Blocked Dates</h2>
          {canManage && (
            <Link to={`/venues/${id}/blocked-dates/new`} className="btn">Add Blocked Date</Link>
          )}
        </div>

        {blockedDates.length === 0 && <p>No blocked dates.</p>}

        <div className="info-list">
          {blockedDates.map((one) => (
            <div key={one._id} className="info-item">
              <div className="card-head">
                <h3>{formatDate(one.date)}</h3>
                <span className="badge">{one.reasonCategory}</span>
              </div>
              <p>{one.timeOfDay}</p>
              {one.reason && <p className="muted">{one.reason}</p>}
              {canManage && (
                <div className="actions">
                  <Link to={`/venues/${id}/blocked-dates/${one._id}/edit`}>Edit</Link>
                  <button className="btn-danger" onClick={() => handleDeleteBlockedDate(one._id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="venue-section">
        <div className="page-head">
          <h2>Reviews</h2>
        </div>
        <p className="error">{reviewError}</p>

        {reviews.length === 0 && <p>No reviews yet.</p>}

        <div className="info-list">
          {reviews.map((one) => (
            <div key={one._id} className="info-item">
              <p className="rating" aria-label={`${one.rating} out of 5`}>
                {"★".repeat(one.rating)}{"☆".repeat(5 - one.rating)}
              </p>
              <p>{one.comment}</p>
              {/* only the person who wrote the review can delete it */}
              {user && one.customer === user._id && (
                <div className="actions">
                  <button className="btn-danger" onClick={() => handleDeleteReview(one._id)}>Delete Review</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {user ? (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <div>
              <label htmlFor="rating">Rating from 1 to 5:</label>
              <select id="rating" name="rating" value={reviewFormData.rating} onChange={reviewHandleChange} required>
                <option value="" disabled>Choose rating...</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>
            <div>
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                maxLength={200}
                value={reviewFormData.comment}
                onChange={reviewHandleChange}
                required
              />
            </div>
            <div className="actions">
              <button type="submit">Add Review</button>
            </div>
          </form>
        ) : (
          <p><Link to="/sign-in">Sign in</Link> to write a review.</p>
        )}
      </section>

    </main>
  );
}

export default VenueDetailsPage;
