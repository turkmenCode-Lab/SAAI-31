import axios from "axios";

export type GoogleEntry = {
    title: string;
    link: string;
    snippet: string;
};

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const CX = process.env.CX!;

export default async function googleSearch(query: string): Promise<GoogleEntry[]> {
    const url = `https://www.googleapis.com/customsearch/v1`;
    const res = await axios.get(url, {
        params: {
            key: GOOGLE_API_KEY,
            cx: CX,
            q: query,
            num: 4,
        },
    });

    return res.data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
    }));
}
