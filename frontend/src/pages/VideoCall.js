import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { usePeerContext } from 'context/Peer';

// For handle the video call procedure
const VideoCall = ({ socketRef }) => {
  const [myStream, setMyStream] = useState(null);
  const { sendStream, remoteStream, setRemoteAns, createAnswer } =
    usePeerContext();
  const getUserMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    await sendStream(stream);
    setMyStream(stream);
  };

  // Handle the starting of nagotiation
  const handleIncomeingNegotiation = async ({ offer, callerSocketId }) => {
    const ans = await createAnswer(offer);
    socketRef.current.emit('peer:nego:done', { ans, callerSocketId });
  };

  // Handle the complation of negotiation
  const handleFinalNegotiation = async ({ ans }) => {
    await setRemoteAns(ans);
  };

  useEffect(() => {
    socketRef.current.on('peer:nego:needed', handleIncomeingNegotiation);
    socketRef.current.on('peer:nego:final', handleFinalNegotiation);
    return () => {
      socketRef.current.off('peer:nego:needed', handleIncomeingNegotiation);
      socketRef.current.off('peer:nego:final', handleFinalNegotiation);
    };
  }, []);

  // JSX
  return (
    <div>
      <h1>My stream</h1>
      <ReactPlayer url={myStream} playing muted controls={true}></ReactPlayer>
      <h1>Remote stream</h1>
      {remoteStream && (
        <ReactPlayer url={remoteStream} playing controls={true}></ReactPlayer>
      )}
      <button
        onClick={() => {
          getUserMediaStream();
        }}
      >
        start video
      </button>
    </div>
  );
};

export default VideoCall;
