import { usePeerContext } from 'context/Peer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// For handle the call acept and reject
const IncomingCall = (props) => {
  const { socketRef, selectCurrentConversation, logedInUser } = props;
  const [incomingCall, setIncomingCall] = useState(false);
  const [callerUserData, setCallerUserData] = useState({});
  const { createAnswer, sendStream } = usePeerContext();
  const navigate = useNavigate();
  // For acept or cut the call
  const userCallResponseHandler = async (callStatus) => {
    if (callStatus) {
      const ans = await createAnswer(callerUserData.offer);
      socketRef.current.emit('call-acepted', {
        ans,
        logedInUser,
        callerUserData,
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      await sendStream(stream);
      navigate(`/call/${callerUserData.callerEmail}`);
    } else {
      // const startCallobj = {
      //   callerEmail: logedInUser.email,
      //   userName: logedInUser.userName,
      //   socketId: selectCurrentConversation?.logedInUserFriend[0]?.socketId,
      // };
      // socketRef.current.emit('reject-call', startCallobj);
    }
  };

  // For hadle the call
  useEffect(() => {
    socketRef.current.on('add-call', ({ startCallBody }) => {
      setIncomingCall(true);
      setCallerUserData(startCallBody);
    });
    socketRef.current.on('reject-call', () => {
      setIncomingCall(false);
    });
  }, []);

  return incomingCall ? (
    <div className="incomeing__call fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-7 shadow-2xl  bg-white rounded-3xl">
      <div className="wrapper flex flex-col">
        <h4 className="text-center uppercase font-bold text-2xl mb-9">
          {callerUserData.userName}
        </h4>
        <div className="flex justify-between gap-2">
          <button
            className="uppercase font-medium bg-green-800 text-white p-2.5 rounded-lg"
            onClick={() => {
              userCallResponseHandler(true);
            }}
          >
            Accept
          </button>
          <button
            className="uppercase font-medium bg-red-600 text-white p-2.5 rounded-lg"
            onClick={() => {
              userCallResponseHandler(false);
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default IncomingCall;
