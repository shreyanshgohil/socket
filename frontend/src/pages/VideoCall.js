import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { usePeerContext } from 'context/Peer';
const VideoCall = () => {
  const [myStream, setMyStream] = useState(null);
  const { sendStream, remoteStream } = usePeerContext();
  const getUserMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    await sendStream(stream);
    setMyStream(stream);
  };

  return (
    <div>
      <ReactPlayer url={myStream} playing muted></ReactPlayer>
      {remoteStream && (
        <ReactPlayer url={remoteStream} playing muted></ReactPlayer>
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
