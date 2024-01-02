import { PrettyChatWindow } from "react-chat-engine-pretty";
import "./channelChat.styles.scss";

const ChannelChatContainer = (props) => {
  const avatarUrl = `https://robohash.org/${props.user.username}4?set=set5&size=30x30`;
  return (
    <div className="channelChatContainer">
      <PrettyChatWindow
        projectId="437ba3a6-aee0-4454-b279-9b6e778ce49b"
        username={props.user.username}
        secret={props.user.secret}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChannelChatContainer;
