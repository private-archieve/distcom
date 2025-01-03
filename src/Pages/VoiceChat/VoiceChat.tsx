import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RTCStartCallPack } from '../../base/WebRTC/Packs/RTCStartCallPack';
import { useVoiceCall } from '../../base/WebRTC/VoiceCallProvider';
import CallFriendsModal from './components/CallFriendsModal/CallFriendsModal';
import IncomingCallModal from './components/IncomingCallModal/IncomingCallModal';
import VoiceCallModal from './components/VoiceCall/VoiceCall';


interface VoiceChatProps {
    isCallModalOpen: boolean;
    setIsCallModalOpen: (isOpen: boolean) => void;
}


const VoiceChat: React.FC<VoiceChatProps> = ({ isCallModalOpen, setIsCallModalOpen }) => {
    const router = useRouter();
    const { isLoggedIn, isLoading, data, siteData } = useDataStore();
    const { startCall, isCallModalOpen: isVoiceCallModalOpen, setCallStatus: setVoiceCallStatus } = useVoiceCall();
    const [isCalling, setIsCalling] = useState(false);
    const [callStatus, setCallStatus] = useState('');
    const [callingFriendName, setCallingFriendName] = useState('');
    const [callingFriendImage, setCallingFriendImage] = useState('');
    const [isCallIncoming, setIsCallIncoming] = useState(false);

    useEffect(() => {
        if (isLoading) return;
        if (siteData.SiteStatus != "1") router.push('/');
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, isLoading, router, data?.UserName]);

    const handleStartCall = async (friendName: string, friendImage: string, friendId: string) => {

        const callPacket = await RTCStartCallPack(friendName, friendId);
        startCall(callPacket);

        setCallingFriendName(friendName);
        setCallingFriendImage(friendImage);
        setIsCallModalOpen(false);
        setIsCalling(true);
        setCallStatus('Calling...');
    };


    return (
        <>
            <VoiceCallModal
                isCalling={isCalling}
                callStatus={callStatus}
                setIsCalling={setIsCalling}
                name={callingFriendName}
                profileImage={callingFriendImage}
                isRinging={false}
            />
            <CallFriendsModal
                isOpen={isCallModalOpen}
                onStartCall={handleStartCall}
                setIsOpen={setIsCallModalOpen}
            />
            <IncomingCallModal
                isOpen={isCallIncoming}
                callerName=""
                onAccept={() => {
                    setIsCallIncoming(false);
                }}
                onDecline={() => {
                    setIsCallIncoming(false);
                }}
            />
        </>
    );
};

export default VoiceChat;

