"use client";
import { deleteReservation } from "../_lib/action";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <div className="space-y-6">
      <ul>
        {optimisticBookings.map((booking) => (
          <ReservationCard
            onDelete={handleDelete}
            booking={booking}
            key={booking.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
