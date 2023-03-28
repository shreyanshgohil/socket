import React from 'react';

const Conversations = (props) => {
  const {
    userConversations,
    selectCurrentConversationHandler,
    selectCurrentConversation,
  } = props;

  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-[200px] overflow-y-auto">
      {userConversations.map((singleUser, index) => {
        return (
          <button
            className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${
              selectCurrentConversation._id === singleUser._id && 'bg-gray-100'
            }`}
            key={index}
            onClick={() => {
              selectCurrentConversationHandler(singleUser);
            }}
          >
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
              {singleUser.userName.charAt(0)}
            </div>
            <div className="ml-2 text-sm font-semibold">
              {singleUser.userName}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Conversations;
