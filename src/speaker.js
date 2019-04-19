import Speaker from 'speaker';

export default () =>
    new Speaker({
        channels: 1,
        bitDepth: 16,
        sampleRate: 192000
    });
