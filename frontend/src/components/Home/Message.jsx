import React from 'react';

const Message = ({ isSender }) => {
  return (
    <div
      className={
        isSender
          ? 'col-start-6 col-end-13 p-3 rounded-lg'
          : 'col-start-1 col-end-8 p-3 rounded-lg '
      }
    >
      <div
        className={`flex gap-2 ${
          isSender
            ? 'items-center justify-start flex-row-reverse'
            : 'flex-row items-center '
        } `}
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          A
        </div>
        <div
          className={`relative  text-sm  py-2 px-4 shadow rounded-xl ${
            isSender ? 'bg-indigo-100' : 'bg-white'
          }`}
        >
          <div>Hey How are you today?</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
