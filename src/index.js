import Video from './youtube';
import FFmpeg from './ffmpeg';
import Speaker from './speaker';

const play = (url = '') =>
    new Promise(async (resolve, reject) => {
        const { info, video } = await Video(url);

        if (!video) {
            reject();
            return;
        }
        console.log(`Now Playing ${info.title}`);
        const ffmpeg = FFmpeg(video, info.length_seconds);
        const audio = Speaker();
        ffmpeg.pipe(audio);
        video.on('error', e => {
            reject(e);
            return;
        });

        ffmpeg.on('error', e => {
            reject(e);
            return;
        });

        ffmpeg.on('end', () => {
            audio.speaker.close();
            resolve();
        });
    });

const main = async () => {
    const [, , ...urls] = process.argv;
    if (!urls.length) {
        urls.push('y2nWIwmM8Y0');
    }
    for (const str of urls) {
        console.log(str);
        try {
            await play(str);
        } catch (error) {
            console.log(error);
        }
    }
};

main();
