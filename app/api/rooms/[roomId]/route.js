import { getBookedDatesByCabinId, getCabin } from "@/helpers/data-service";

export async function GET(request, { params }) {
  const { roomId } = params;

  try {
    const [room, bookedDates] = await Promise.all([
      getCabin(roomId),
      getBookedDatesByCabinId(roomId),
    ]);
    return Response.json({ room, bookedDates });
  } catch (error) {
    return Response.json({ message: `Room not found` });
  }
}
export async function POST() {}
