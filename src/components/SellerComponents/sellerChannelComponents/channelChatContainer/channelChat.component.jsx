import { PrettyChatWindow } from "react-chat-engine-pretty";
import "./channelChat.styles.scss";

const ChannelChatContainer = (props) => {
  const avatarUrl = `https://robohash.org/${props.user.username}4?set=set5&size=30x30`;
  return (
    <div className="channelChatContainer">
      <PrettyChatWindow
        projectId="4b75303b-41c5-406e-9f98-800487ca4332"
        username={props.user.username}
        secret={props.user.secret}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChannelChatContainer;
