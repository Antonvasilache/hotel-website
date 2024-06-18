import { updateReservation } from "@/helpers/actions";
import { getBooking, getCabin } from "@/helpers/data-service";
import UpdateReservation from "@/components/UpdateReservation";

async function Page({ params }) {
  //Reading the reservation ID fron the route's params
  const reservationId = params.reservationId;
  //Using the ID, we retrieve the reservation properties from the backend
  const { numGuests, cabinId, observations } = await getBooking(reservationId);
  //Using the room ID to get the max capacity of the room
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>
      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        //upadating reservation using the inputs below
        action={updateReservation}
      >
        {/* hidden input is used to deliver the reservationId into the above form action. numGuests and observations are visible and selected in the inputs below */}
        <input type="hidden" value={reservationId} name="reservationId" />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={numGuests}
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
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
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <UpdateReservation />
        </div>
      </form>
    </div>
  );
}

export default Page;
