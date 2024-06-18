import RoomCard from "./RoomCard";
import { getCabins } from "@/helpers/data-service";

export default async function RoomsList({ filter }) {
  const rooms = await getCabins();

  if (!rooms.length) return null;

  //displayedRooms will store the rooms that fit the maxCapacity, as defined by the small/medium/large sizes
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
      {/* RoomCards will be rendered for each room found in the displayedRooms array */}
      {displayedRooms.map((room) => (
        <RoomCard room={room} key={room.id}></RoomCard>
      ))}
    </div>
  );
}
