import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import RoomsList from "@/components/RoomsList";
import Filter from "@/components/Filter";
import ReservationReminder from "@/components/ReservationReminder";

//export const revalidate = 3600;

export const metadata = {
  title: "Rooms",
};

function Page({ searchParams }) {
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
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <RoomsList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

export default Page;
