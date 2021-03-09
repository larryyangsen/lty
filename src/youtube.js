import ytdl from 'ytdl-core';
const ytdlOption = {
    liveBuffer: 10000,
    quality: 'highestaudio',
};
export default async (str = '') => {
    if (ytdl.validateURL(str) || ytdl.validateID(str)) {
        const info = await ytdl.getBasicInfo(str);
        const video = ytdl(str, ytdlOption);
        return { info, video };
    }
    console.warn('not validated url or id');
    return {};
};
