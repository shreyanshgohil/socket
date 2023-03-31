import React, { useState, useEffect } from 'react';

const IncomingCall = (props) => {
  const { socketRef } = props;
  const [incomingCall, setIncomingCall] = useState(false);

  useEffect(() => {
    socketRef.current.on('add-call', () => {
      setIncomingCall(true);
    });
    socketRef.current.on('end-call', () => {
      setIncomingCall(false);
    });
  }, []);
  return incomingCall ? <h1>IncomingCall</h1> : null;
};

export default IncomingCall;
