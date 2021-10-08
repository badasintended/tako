import { writable } from "svelte/store";
import type { Manga } from "tako/api/model";

export const darkMode = writable(true);
export const chapterSort = writable(-1);
export const showNavBar = writable(true);
export const currentManga = writable(null as Manga);
