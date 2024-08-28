import type { User } from "$lib/types";
import { writable } from "svelte/store";

export const user = writable<User | null>(null);