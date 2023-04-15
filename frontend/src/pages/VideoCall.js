import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { usePeerContext } from 'context/Peer';
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

  const handleIncomeingNegotiation = async ({ offer, callerSocketId }) => {
    const ans = await createAnswer(offer);
    socketRef.current.emit('peer:nego:done', { ans, callerSocketId });
  };

  const handleFinalNegotiation = async ({ ans }) => {
    await setRemoteAns(ans);
  };
  useEffect(() => {
    socketRef.current.on('peer:nego:needed', handleIncomeingNegotiation);
    socketRef.current.on('peer:nego:final', handleFinalNegotiation);
  });

  useEffect(() => {}, [myStream, remoteStream]);

  // const negotiationneededHandler = async () => {
  //   const startCallobj = {
  //     callerEmail: logedInUser.email,
  //     userName: logedInUser.userName,
  //     socketId: selectCurrentConversation?.logedInUserFriend[0]?.socketId,
  //     callerSocketId: logedInUser.socketId,
  //   };
  //   const offer = await createOffer();

  //   socketRef.current.emit('peer:nego:needed', { offer, ...startCallobj });
  // };

  // useEffect(() => {
  //   peer.addEventListener('negotiationneeded', negotiationneededHandler);
  // }, []);

  return (
    <div>
      <h1>My stream</h1>
      <ReactPlayer url={myStream} playing muted></ReactPlayer>
      <h1>Remote stream</h1>
      {remoteStream && <ReactPlayer url={remoteStream} playing></ReactPlayer>}
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
