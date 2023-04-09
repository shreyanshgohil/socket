import React, { useState } from 'react';
import { usePeerContext } from 'context/Peer';
import { useNavigate } from 'react-router-dom';
// For the perform the video call
const VideoCallButton = (props) => {
  // Inits
  const [toggleCall, setToggleCall] = useState(false);
  const { socketRef, selectCurrentConversation, logedInUser } = props;
  const { createOffer } = usePeerContext();
  const navigate = useNavigate();
  //   For connect to the video call
  const connectVideoCallHandler = async () => {
    const startCallobj = {
      callerEmail: logedInUser.email,
      userName: logedInUser.userName,
      socketId: selectCurrentConversation?.logedInUserFriend[0]?.socketId,
      callerSocketId: logedInUser.socketId,
    };
    if (!toggleCall) {
      if (selectCurrentConversation?.logedInUserFriend[0]?.socketId) {
        const offer = await createOffer();
        socketRef.current.emit('start-call', { ...startCallobj, offer });
        navigate(`/call/${logedInUser.email}`);
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
      {toggleCall ? 'Decline' : 'Call'}
    </button>
  ) : null;
};

export default VideoCallButton;
