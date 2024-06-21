"use client";

import { useFormStatus } from "react-dom";
import { differenceInDays } from "date-fns";
import { createReservation } from "@/helpers/actions";
import { useReservation } from "./ReservationContext";

function ReservationForm({ room, user }) {
  const { pending } = useFormStatus();
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = room;

  const startDate = range?.from;
  const endDate = range?.to;

  //calculating number of nights and room price, if a discount exists
  const numNights = differenceInDays(endDate, startDate);
  const roomPrice = numNights * (regularPrice - discount);

  //creating a reservation object with the properties related to the calendar section and the room Id
  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice: roomPrice,
    cabinId: id,
  };

  //the reservation object will be added to the other properties mentioned in the createReservation action, matching the bookings table schema in the backend
  const createReservationWithData = createReservation.bind(
    null,
    reservationData
  );
  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          //collecting the number of guests and special requests, if any, from the reservation form
          await createReservationWithData(formData);
          //resetting the dates range after the reservation has been made
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {/* The options for number of guests will be dynamically generated, based on the maxCapacity of each room */}
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="obersvations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requests etc."
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <button
              className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
              disabled={pending}
            >
              {pending ? "Reserving now..." : "Reserve now"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
