"use server";

export async function logError(e: Error) {
  console.log("There was an error", new Date(), e);
}
