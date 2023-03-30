import React, { useState, useEffect } from 'react';

const IncomingCall = (props) => {
  const { socketRef } = props;
  const [incomingCall, setIncomingCall] = useState(false);

  useEffect(() => {
    socketRef.current.on('calling', () => {
      setIncomingCall(true);
    });
  }, []);
  return incomingCall ? <h1>IncomingCall</h1> : null;
};

export default IncomingCall;
