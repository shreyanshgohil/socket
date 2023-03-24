import React from "react";

const Conversations = (props) => {
  const { conversations } = props;
  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
      {conversations.map((singleUser,index) => {
        return (
          <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" key={index}>
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
              {singleUser.charAt(0)}
            </div>
            <div className="ml-2 text-sm font-semibold">{singleUser}</div>
          </button>
        );
      })}
    </div>
  );
};

export default Conversations;
