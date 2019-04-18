import FFmpeg from 'fluent-ffmpeg';

export default (input, duration) => {
    const ffmpeg = new FFmpeg(input)
        .audioChannels(1)
        .audioFrequency(192000)
        .audioBitrate(16)
        .noVideo()
        .format('wav');
    if (duration !== 0) {
        ffmpeg.duration(duration);
    }
    return ffmpeg;
};
