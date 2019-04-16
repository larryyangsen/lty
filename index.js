import ytdl from 'ytdl-core';
import FFmpeg from 'fluent-ffmpeg';
import Speaker from 'speaker';

const url = process.argv[2] || 'https://www.youtube.com/watch?v=mXRfApkMYZU';
const ytdlOption = {
    liveBuffer: 10000
};
const main = () => {
    const speaker = new Speaker({
        channels: 1,
        bitDepth: 16,
        sampleRate: 44100
    });
    const video = ytdl(url, ytdlOption);
    FFmpeg(video)
        .audioChannels(1)
        .audioFrequency(44100)
        .audioBitrate(16)
        .format('wav')
        .pipe(speaker);
};
main();
