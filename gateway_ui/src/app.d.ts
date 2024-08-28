// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Certificate, User } from "$lib/types";

declare global {
	declare namespace App {
		interface Error {}
		interface Locals {
			user: User;
		}
		interface PageData {
			certificates: Certificate[];
			certificate: Certificate;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
