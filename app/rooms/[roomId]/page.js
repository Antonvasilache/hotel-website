import { Suspense } from "react";
import Room from "@/components/Room";
import Spinner from "@/components/Spinner";
import Reservation from "@/components/Reservation";
import { getCabin, getCabins } from "@/helpers/data-service";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.roomId);

  return {
    title: `Room ${name}`,
  };
}

//Generating the room routes at build time, instead of on-demand at request time
export async function generateStaticParams() {
  //retrieving the rooms from the backend
  const rooms = await getCabins();

  //generating an array of Ids for all the retrieved rooms
  const ids = rooms.map((room) => ({ roomId: String(room.id) }));

  //returning an array of room Ids to populate the [roomId] segment
  return ids;
}

async function Page({ params }) {
  //retrieving the room data for the room associated with the respective roomId
  const room = await getCabin(params.roomId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* First section is a Room component displaying room picture, description and details */}
      <Room room={room} />

      {/* Second section the Reservation component, where the user can select the reservation dates from the calendar, then number of guests and special requests if any  */}
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve room {room.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation room={room} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
