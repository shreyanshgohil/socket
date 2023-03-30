import React, { useState } from 'react';

// For the perform the video call
const VideoCallButton = (props) => {
  // Inits
  const [toggleCall, setToggleCall] = useState(false);
  const { socketRef, selectCurrentConversation, logedInUser } = props;

  //   For connect to the video call
  const connectVideoCallHandler = () => {
    const startCallobj = {
      callerEmail: logedInUser.email,
      userName: logedInUser.userName,
      socketId: selectCurrentConversation?.logedInUserFriend[0]?.socketId,
    };
    if (!toggleCall) {
      if (selectCurrentConversation?.logedInUserFriend[0]?.socketId) {
        socketRef.current.emit('start-call', startCallobj);
      }
    } else {
      socketRef.current.emit('end-call', startCallobj);
    }
    setToggleCall(!toggleCall);
  };

  //   JSX
  return selectCurrentConversation?.logedInUserFriend[0]?.socketId ? (
    <button
      type="button"
      className={`inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] bg-stone-500 w-min mt-3 mb-6 self-end `}
      onClick={connectVideoCallHandler}
    >
      Video
    </button>
  ) : null;
};

export default VideoCallButton;
