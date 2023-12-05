import { PrettyChatWindow } from "react-chat-engine-pretty";
import "./channelChat.styles.scss";

const ChannelChatContainer = (props) => {
  const avatarUrl = `https://robohash.org/${props.user.username}4?set=set5&size=30x30`;
  return (
    <div className="channelChatContainer">
      <PrettyChatWindow
        projectId="c18b96cf-f444-4fa1-b996-67a97fb9ca86"
        username={props.user.username}
        secret={props.user.secret}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChannelChatContainer;
