import axios from "axios";
import {PageData, ScrapBoxPageLine, Sound} from "../share/data";

const SCRAPBOX_API_ENDPOINT: string = "https://scrapbox.io/api/pages/gyaonlist/";

const parseLine = (line: string): Sound | undefined => {
    const bracketIndex = line.indexOf("[");
    if (bracketIndex === -1) {
        return undefined
    }

    const audio_key = line.substr(bracketIndex + 1).split("]");
    const url_comment = audio_key[0].split(" ");
    let url: string;
    let comment: string;
    for (let ele of url_comment) {
        if (ele === "") {
            continue
        }
        if (ele.match("^(http|https)://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=:]*)?$")) {
            url = ele;
            continue
        }
        comment = ele
    }

    return {
        url: url,
        title: comment,
        keyboard: audio_key[1]
    }
};

const getSounds = (pageLines: ScrapBoxPageLine[]): Sound[] => {
    const lines: Sound[] = [];
    for (let line of pageLines) {
        const sound = parseLine(line.text);
        if (!sound) {
            continue
        }
        lines.push(sound)
    }
    return lines
};

const getListPageLines = async (title: string): Promise<ScrapBoxPageLine[]> => {
    const url = SCRAPBOX_API_ENDPOINT + encodeURIComponent(title);
    const {data} = await axios.get(url).catch(err => {
        const {status, statusText} = err.response;
        throw Object.assign(new Error(statusText), {
            statusCode: status
        });
    });
    return data.lines
};

const getPageData = async (title: string): Promise<PageData> => {
    return {
        title: title,
        sounds: getSounds(await getListPageLines(title))
    }
};

export const getPageList = async (): Promise<PageData[]> => {
    const {data} = await axios.get(SCRAPBOX_API_ENDPOINT + "?skip=1");
    const promises: Promise<PageData>[] = data.pages.map(async page => await getPageData(page.title));
    return Promise.all(promises)
};