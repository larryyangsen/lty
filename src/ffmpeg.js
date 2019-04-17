import FFmpeg from 'fluent-ffmpeg';

export default input =>
    FFmpeg(input)
        .audioChannels(1)
        .audioFrequency(192000)
        .audioBitrate(16)
        .format('wav');
