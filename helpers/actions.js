"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { auth, signIn, signOut } from "./auth";

//Updating user profile with full name, email, nationality and national ID
export async function updateProfile(formData) {
  //User authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //Getting nationalID and nationality(+country flag) from the update profile form
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  //Validating the nationalID format
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  //Creating an object with the updated data, properties matching the guests table schema in the backend
  const updateData = { nationality, countryFlag, nationalID };

  //Using the updated data to mutate the guest with the given id, from the guests table
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  //Throwing error if mutation could not be completed
  if (error) throw new Error("Guest could not be updated");

  //Revalidating the /profile path to ensure updates are rendered immediately
  revalidatePath("/account/profile");
}

//Creating a new reservation using the given reservation data and the reservation form data
export async function createReservation(reservationData, formData) {
  //User authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //Creating the full reservation object by destructuring the given reservationData into the newReservation object.
  //All the newReservation properties must match the bookings table schema
  const newReservation = {
    ...reservationData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: reservationData.roomPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  //Inserting the newReservation into the bookings table
  const { error } = await supabase.from("bookings").insert([newReservation]);

  //Throwing error if insert was not successful
  if (error) throw new Error("Booking could not be created");

  //Revalidating the room page to ensure the booked dates are disabled
  revalidatePath(`/rooms/${reservationData.cabinId}`);
  //Redirecting to the Thank You page
  redirect("/rooms/thankyou");
}

//Deleting a reservation with the given reservation id
export async function deleteReservation(bookingId) {
  //User authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  //Deleting the booking with the given id from the bookings table
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  //Throwing error if the booking could not be deleted
  if (error) throw new Error("Booking could not be deleted");

  //Revalidating the /reservations path to ensure that the reservations list is updated immediately
  revalidatePath("/account/reservations");
}

//Updating a reservation based on the entered formData
export async function updateReservation(formData) {
  //Getting the reservationId from the hidden input
  const reservationId = Number(formData.get("reservationId"));

  //Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(reservationId))
    throw new Error("You are not allowed to update this booking");

  //Building the update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations".slice(0, 1000)),
  };

  //Mutating the bookings table entry with the given id
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", reservationId);

  //Throwing error if mutation was not successful
  if (error) throw new Error("Booking could not be updated");

  //Revalidating reservation page
  revalidatePath(`/account/reservations/edit/${reservationId}`);

  //Redirecting to reservations list
  redirect("/account/reservations");
}

//Signing in using the signIn function from the authConfig object
export async function signInAction(formData = null) {
  const roomId = formData ? formData.get("roomId") : null;

  await signIn("google", {
    redirectTo: roomId ? `/rooms/${roomId}` : `/account`,
  });
}

//Signing out using the signOut function from the authConfig object
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
