import RoomCard from "./RoomCard";
import { getCabins } from "@/helpers/data-service";
import { unstable_noStore as noStore } from "next/cache";

export default async function RoomsList({ filter }) {
  //noStore();

  const rooms = await getCabins();

  if (!rooms.length) return null;

  let displayedRooms;
  if (filter === "all") displayedRooms = rooms;
  if (filter === "small")
    displayedRooms = rooms.filter((room) => room.maxCapacity <= 3);
  if (filter === "medium")
    displayedRooms = rooms.filter(
      (room) => room.maxCapacity >= 4 && room.maxCapacity <= 7
    );
  if (filter === "large")
    displayedRooms = rooms.filter((room) => room.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedRooms.map((room) => (
        <RoomCard room={room} key={room.id}></RoomCard>
      ))}
    </div>
  );
}
