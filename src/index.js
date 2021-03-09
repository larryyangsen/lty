import Through2 from 'through2';
import Video from './youtube';
import FFmpeg from './ffmpeg';
import Speaker from './speaker';

const play = (url = '') =>
    new Promise(async (resolve, reject) => {
        const { info, video } = await Video(url);

        if (!video || !info) {
            reject();
            return;
        }
        const duration = +info.videoDetails.lengthSeconds;
        const speaker = Speaker();
        const stream = Through2();
        const onEnd = () => {
            speaker.close();
            stream.destroy();
            resolve();
        };
        const onFFmpegError = (e) => reject(e);
        const ffmpeg = FFmpeg(video, duration, onEnd, onFFmpegError);

        console.log(`Now Playing ${duration === 0 ? 'live video' : ''} ${info.videoDetails.title}`);
        // console.log(duration);
        ffmpeg.pipe(stream);
        stream.pipe(speaker);
        video.on('error', (e) => {
            console.log(e.message);
            reject(e);
        });
    });

const main = async () => {
    const [, , ...urls] = process.argv;
    if (!urls.length) {
        urls.push('y2nWIwmM8Y0');
    }
    while (1) {
        for (const str of urls) {
            console.log(str);
            try {
                await play(str);
            } catch (error) {
                console.log(error);
            }
        }
    }
};

main();
