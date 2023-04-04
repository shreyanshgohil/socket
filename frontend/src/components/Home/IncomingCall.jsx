import React, { useState, useEffect } from 'react';

const IncomingCall = (props) => {
  const { socketRef } = props;
  const [incomingCall, setIncomingCall] = useState(false);
  const [callerUserData, setCallerUserData] = useState({});
  useEffect(() => {
    socketRef.current.on('add-call', ({ startCallBody }) => {
      setIncomingCall(true);
      setCallerUserData(startCallBody);
    });
    socketRef.current.on('end-call', () => {
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
          <button className="uppercase font-medium bg-green-800 text-white p-2.5 rounded-lg">
            Accept
          </button>
          <button className="uppercase font-medium bg-red-600 text-white p-2.5 rounded-lg">
            Decline
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default IncomingCall;
