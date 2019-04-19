import Through2 from 'through2';
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
        const duration = +info.length_seconds;
        const speaker = Speaker();
        const stream = new Through2();
        const onFFmpegStart = () => {
            if (duration !== 0) {
                const timeout = setTimeout(() => {
                    speaker.close();
                    clearTimeout(timeout);
                    stream.destroy();
                    resolve();
                }, (duration + 1) * 1000);
            }
        };
        const onFFmpegError = e => reject(e);
        const ffmpeg = FFmpeg(video, duration, onFFmpegStart, onFFmpegError);
        console.log(
            `Now Playing ${duration === 0 ? 'live video' : ''} ${info.title}`
        );
        // console.log(duration);
        ffmpeg.pipe(stream);
        stream.pipe(speaker);
        video.on('error', e => {
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
