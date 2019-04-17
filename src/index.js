import Video from './youtube';
import FFmpeg from './ffmpeg';
import Speaker from './speaker';

const url = process.argv[2] || 'https://www.youtube.com/watch?v=mXRfApkMYZU';
(async () => {
    const play = (url = '') =>
        new Promise(async (resolve, reject) => {
            const { info, video } = await Video(url);
            if (!video) {
                reject();
                return;
            }
            console.log(`Now Playing ${info.title}`);
            const audio = Speaker();
            const ffmpeg = FFmpeg(video);
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
                resolve();
                audio.speaker.close();
                return;
            });
        });

    try {
        await play(url);
    } catch (error) {
        console.log(error);
    }
})();
