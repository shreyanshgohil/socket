import { createContext, useContext, useMemo, useEffect, useState } from 'react';

const PeerContext = createContext(null);

export const usePeerContext = () => useContext(PeerContext);

export const PeerContextProvider = ({ children }) => {
  const [remoteStream, setRemoteStream] = useState(null);
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:global.stun.twilio.com:3478',
            ],
          },
        ],
      }),
    []
  );

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async (offer) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  const setRemoteAns = async (ans) => {
    await peer.setRemoteDescription(ans);
  };

  const sendStream = async (stream) => {
    const tracks = await stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  };

  useEffect(() => {
    peer.addEventListener('track', (ev) => {
      const streams = ev.streams;
      setRemoteStream(streams[0]);
    });
  }, []);

  return (
    <PeerContext.Provider
      value={{
        peer,
        createOffer,
        createAnswer,
        setRemoteAns,
        sendStream,
        remoteStream,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};
