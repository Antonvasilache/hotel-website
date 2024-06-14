import Reservation from "@/components/Reservation";
import Room from "@/components/Room";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/helpers/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.roomId);

  return {
    title: `Room ${name}`,
  };
}

export async function generateStaticParams() {
  const rooms = await getCabins();

  const ids = rooms.map((room) => ({ roomId: String(room.id) }));

  return ids;
}

async function Page({ params }) {
  const room = await getCabin(params.roomId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Room room={room} />

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
