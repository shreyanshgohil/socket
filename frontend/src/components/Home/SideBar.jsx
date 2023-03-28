import Conversations from './Conversations';
import QuickStart from './QuickStart';

const SideBar = (props) => {
  const {
    userConversations,
    selectCurrentConversationHandler,
    selectCurrentConversation,
  } = props;

  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <QuickStart />
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {userConversations.length}
          </span>
        </div>
        <Conversations
          userConversations={userConversations}
          selectCurrentConversationHandler={selectCurrentConversationHandler}
          selectCurrentConversation={selectCurrentConversation}
        />
        {/* <div className="flex flex-row items-center justify-between text-xs mt-6">
          <span className="font-bold">Archivied</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            7
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-14">
          <Conversations conversations={activeConversations} />
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;
