// config.ts

const config = {
    voiceChatServer: 'wss://voicechat.Mogartnetwork.deswu.co:443',
    iceServerConfig: {
        iceServers: [
            { urls: 'stun:stun.Mogartnetwork.deswu.co' },
            { urls: 'turn:turn.Mogartnetwork.deswu.co', username: 'notset', credential: 'notset' }
        ]
    },
    mediaConstraints: {
        audio: true,
        video: false
    },
    websocketTimeout: 5000
};

export default config;
