"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings, updateGuest } from "./data-service";
import { supabase } from "./supabase";

export async function SignInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function SignOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function UpdateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You are not currently logged in.");

  const nationalId = formData.get("nationalId");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, nationalId, countryFlag };

  try {
    updateGuest(session.user.guestId, updateData);
  } catch {
    throw new Error("Unable to create user");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Please login to delete this reservation.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation.");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservation");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("Please login to update this reservation.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => String(booking.id));

  const bookingId = formData.get("bookingId");

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation.");

  const updatedFields = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("Please login to reserve this hotel.");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thank-you");
}
