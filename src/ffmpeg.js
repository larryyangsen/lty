import FFmpeg from 'fluent-ffmpeg';

export default (input, duration) =>
    new FFmpeg(input)
        .duration(duration)
        .audioChannels(1)
        .audioFrequency(192000)
        .audioBitrate(16)
        .format('wav');
