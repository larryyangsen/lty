import ytdl from 'ytdl-core';
import FFmpeg from 'fluent-ffmpeg';
import Speaker from 'speaker';

const url = process.argv[2] || 'https://www.youtube.com/watch?v=mXRfApkMYZU';
const ytdlOption = {
    liveBuffer: 10000
};
if (!ytdl.validateURL(url)) {
    console.warn('not validated youtube url');
    process.exit(0);
}
const main = () => {
    const speaker = new Speaker({
        channels: 1,
        bitDepth: 16,
        sampleRate: 44100
    });
    const video = ytdl(url, ytdlOption);
    const ffmpeg = FFmpeg(video)
        .audioChannels(1)
        .audioFrequency(44100)
        .audioBitrate(16)
        .format('wav');
    ffmpeg.on('error', e => {
        console.log(e.message);
    });
    ffmpeg.pipe(speaker);
    speaker
};
main();
