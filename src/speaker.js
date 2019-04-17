import Speaker from 'audio-speaker/stream';

export default () =>
    Speaker({
        channels: 1,
        bitDepth: 16,
        sampleRate: 192000
    });
