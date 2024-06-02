import { writable } from "svelte/store";

export const isSubmitted = writable(false);
export const email = writable("");
export const formErrors = writable({});
