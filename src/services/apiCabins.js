import supabase, { supabaseUrl } from "./supabase";
import { format } from "date-fns";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be loaded`);
  }

  return data;
}

export async function getAvalableCabins({
  startDate,
  endDate,
  excludeBookingId,
}) {
  if (
    !(startDate instanceof Date) ||
    !(endDate instanceof Date) ||
    !Number.isFinite(startDate.getTime()) ||
    !Number.isFinite(endDate.getTime()) ||
    endDate <= startDate
  ) {
    throw new Error("A valid booking date range is required");
  }

  const start = format(startDate, "yyyy-MM-dd");
  const end = format(endDate, "yyyy-MM-dd");

  let bookingsQuery = supabase
    .from("bookings")
    .select("cabinId")
    .lt("startDate", end)
    .gt("endDate", start);

  if (excludeBookingId)
    bookingsQuery = bookingsQuery.neq("id", excludeBookingId);

  const [
    { data: cabins, error: cabinsError },
    { data: bookings, error: bookingsError },
  ] = await Promise.all([supabase.from("Cabins").select("*"), bookingsQuery]);

  if (cabinsError || bookingsError) {
    console.error(cabinsError || bookingsError);
    throw new Error("Available cabins could not be loaded");
  }

  const bookedCabinIds = new Set(bookings.map((booking) => booking.cabinId));

  return cabins.filter((cabin) => !bookedCabinIds.has(cabin.id));
}

export async function createUpdateCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";

  const imageName = hasImagePath
    ? null
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from(`Cabins`);

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created`);
  }

  // 2. Upload image
  if (hasImagePath) return data; // do not upload the image to the bucket if it is exist

  const { error: storeageError } = await supabase.storage
    .from(`cabin-images`)
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storeageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
    console.error(storeageError);
    throw new Error(
      `Cabin image could not be uploaded, and the cabin was not created.`,
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be deleted`);
  }

  return data;
}
