import { auth } from "@/helpers/auth";
import { getBookedDatesByCabinId, getSettings } from "@/helpers/data-service";

import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ room }) {
  //retrieving the reservation settings (applied to all rooms) and the booked dates for the current room, from the backend
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(room.id),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] ">
      {/* Calendar used to select reservation dates, if they are available */}
      <DateSelector settings={settings} bookedDates={bookedDates} room={room} />
      {/* If the user is logged in, will render the ReservationForm, otherwise, it will render a login prompt */}
      {session?.user ? (
        <ReservationForm room={room} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
