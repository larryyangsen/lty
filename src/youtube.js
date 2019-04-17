import ytdl from 'ytdl-core';
const ytdlOption = {
    liveBuffer: 10000
};
export default async (url = '') => {
    if (!ytdl.validateURL(url)) {
        console.warn('not validated youtube url');
        return {};
    }
    const info = await ytdl.getBasicInfo(url);
    const video = ytdl(url, ytdlOption);
    return { info, video };
};
