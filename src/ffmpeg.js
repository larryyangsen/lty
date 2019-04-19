import FFmpeg from 'fluent-ffmpeg';

export default (input, duration, onStart, onError) => {
    const ffmpeg = new FFmpeg(input)
        .audioChannels(1)
        .audioFrequency(192000)
        .audioBitrate(16)
        .noVideo()
        .format('wav');

    if (duration !== 0) {
        ffmpeg.duration(duration);
    }
    if (typeof onStart === 'function') {
        ffmpeg.once('progress', onStart);
    }
    if (typeof onError === 'function') {
        ffmpeg.on('error', onError);
    }
    return ffmpeg;
};
