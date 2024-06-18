import { Suspense } from "react";
import Filter from "@/components/Filter";
import Spinner from "@/components/Spinner";
import RoomsList from "@/components/RoomsList";
import ReservationReminder from "@/components/ReservationReminder";

export const metadata = {
  title: "Rooms",
};

function Page({ searchParams }) {
  //Getting the capacity param to be used below for filtering rooms
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">Our Rooms</h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy and luxurious rooms, located at the slopes of the mountainside, in
        the forest. Wake up to stunning mountain views, spend your days
        exploring the woods or just relax in your private hot tub, under the
        stars. Enjoy your own little corner of nature, away from the city.
      </p>
      <div className="flex justify-end mb-8">
        {/* Component used to filter the rooms list based on the room size, by storing the room size in the URL */}
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        {/* Rooms list is rendered based on the URL generated in the Filter component, which is then retrieved with searchParams in the Page component and passed down as a prop*/}
        <RoomsList filter={filter} />
        {/* Reservation reminder is rendered when the user selects dates and then leaves the room page*/}
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

export default Page;
