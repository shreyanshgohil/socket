import { Message, SideBar, VideoCallButton } from 'components/Home';
import IncomingCall from 'components/Home/IncomingCall';
import { usePeerContext } from 'context/Peer';
import { useUserContext } from 'context/User';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'utils/common';

const Home = ({ socketRef }) => {
  // Inits

  const { user: logedInUser } = useUserContext();
  const navigate = useNavigate();
  const scrollableRef = useRef(null);
  const [userConversations, serUserConversations] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const [userEnteredMessage, setUserEnteredMessage] = useState('');
  const [selectCurrentConversation, setSelectCurrentConversation] =
    useState('');
  const { setRemoteAns } = usePeerContext();
  // For set the current conversation with someone
  const selectCurrentConversationHandler = (userId) => {
    setSelectCurrentConversation(userId);
  };
  // For fetch all the conversations
  const fetchAllConversationos = async () => {
    if (logedInUser) {
      const { status, conversations } = await api(
        `/conversation/${logedInUser?._id}`
      );
      if (status === 200) {
        serUserConversations(conversations);
        setSelectCurrentConversation((prevState) => {
          const currentConversationUser = conversations.find(
            (singleConversation) => singleConversation._id === prevState._id
          );
          if (currentConversationUser) {
            return currentConversationUser;
          } else {
            return prevState;
          }
        });
      }
    } else {
      navigate('/login');
    }
  };

  // For fetch all the conversations
  const fetchAllMessagesHandler = async () => {
    if (logedInUser) {
      if (selectCurrentConversation) {
        const { status, messages } = await api(
          `/messages/${selectCurrentConversation._id}`
        );
        if (status === 200) {
          setUserChats(messages);
        }
      }
    } else {
      navigate('/login');
    }
  };

  // For add the messages to current conversations
  const addMessageToConversation = async () => {
    const messageBody = {
      conversationId: selectCurrentConversation,
      senderId: logedInUser._id,
      userMessage: userEnteredMessage,
    };

    await api('/messages/', {
      body: messageBody,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    });
    setUserChats([...userChats, messageBody]);
    setUserEnteredMessage('');

    if (selectCurrentConversation.logedInUserFriend[0].socketId) {
      socketRef.current.emit('message', {
        userId: logedInUser._id,
        reciverSocketId:
          selectCurrentConversation.logedInUserFriend[0].socketId,
        message: messageBody,
      });
    }
  };

  // for handle the submition of form
  const sendMessageFormHandler = (event) => {
    event.preventDefault();
    addMessageToConversation();
  };

  //for handle the scroll at bottom
  useEffect(() => {
    if (logedInUser) {
      if (scrollableRef.current) {
        scrollableRef.current.scrollTop = userChats.length * 1000;
      }
    } else {
      navigate('/login');
    }
  }, [userChats]);

  // For fetch all the conversations
  useEffect(() => {
    fetchAllConversationos();
  }, []);

  // For fetch all the chats of user
  useEffect(() => {
    fetchAllMessagesHandler();
  }, [selectCurrentConversation]);

  // for get and set the message
  useEffect(() => {
    if (logedInUser) {
      socketRef.current.on('getMessage', ({ userId, message }) => {
        setUserChats((prevState) => {
          return [...prevState, message];
        });
      });
    } else {
      navigate('/login');
    }
  }, []);

  //useEffect
  useEffect(() => {
    if (logedInUser) {
      socketRef.current.on('loginDone', () => {
        fetchAllConversationos();
      });
      socketRef.current.on('call-acepted', async ({ ans }) => {
        await setRemoteAns(ans);
      });
    } else {
      navigate('/login');
    }
  }, []);

  // JSX
  return userConversations.length > 0 ? (
    <div className="flex h-screen antialiased text-gray-800">
      <IncomingCall
        socketRef={socketRef}
        selectCurrentConversation={selectCurrentConversation}
        logedInUser={logedInUser}
      />
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBar
          userConversations={userConversations}
          selectCurrentConversationHandler={selectCurrentConversationHandler}
          selectCurrentConversation={selectCurrentConversation}
        />
        {selectCurrentConversation && (
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <VideoCallButton
                socketRef={socketRef}
                selectCurrentConversation={selectCurrentConversation}
                logedInUser={logedInUser}
              />
              <div
                className="flex flex-col h-full overflow-x-auto mb-4"
                ref={scrollableRef}
              >
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {userChats.map((singleMessage, index) => {
                      let isSender =
                        logedInUser._id === singleMessage.senderId
                          ? true
                          : false;
                      return (
                        <Message
                          key={index}
                          isSender={isSender}
                          singleMessage={singleMessage}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <form
                  className="flex-grow ml-4 flex items-center"
                  onSubmit={sendMessageFormHandler}
                >
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      onChange={(e) => {
                        setUserEnteredMessage(e.target.value);
                      }}
                      value={userEnteredMessage}
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="ml-4">
                    <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Home;
