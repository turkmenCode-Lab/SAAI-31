import { GoogleEntry } from "./googleSearch";

export type UnifiedEntry = {
    text: string;
    title?: string;
    link?: string;
};

export function unifyGoogleEntry(entry: GoogleEntry): UnifiedEntry {
    return { text: entry.snippet, title: entry.title, link: entry.link };
}
