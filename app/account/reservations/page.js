import Link from "next/link";
import { auth } from "@/helpers/auth";
import { getBookings } from "@/helpers/data-service";
import ReservationList from "@/components/ReservationList";

export const metadata = {
  title: "Reservations",
};

async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>
      {/* Rendering the reservations list for the current user */}
      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link href="/rooms" className="underline text-accent-500">
            rooms &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}

export default Page;
