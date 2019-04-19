import FFmpeg from 'fluent-ffmpeg';

export default (input, duration, onEnd, onError) => {
    const ffmpeg = new FFmpeg(input)
        .audioChannels(1)
        .audioFrequency(192000)
        .audioBitrate(16)
        .noVideo()
        .format('wav');

    if (duration !== 0) {
        ffmpeg.duration(duration);
    }
    if (typeof onEnd === 'function') {
        ffmpeg.on('end', onEnd);
    }
    if (typeof onError === 'function') {
        ffmpeg.on('error', onError);
    }
    return ffmpeg;
};
