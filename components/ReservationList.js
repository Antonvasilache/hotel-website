"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "@/helpers/actions";

export default function ReservationList({ bookings }) {
  //Using an optimistic update for deleting reservations
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    //Filtering out the booking id of the reservation being deleted
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {/* Rendering the reservations list optimistically, after the booking has been deleted */}
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
