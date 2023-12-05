import { PrettyChatWindow } from "react-chat-engine-pretty";
import "./channelChat.styles.scss";

const ChannelChatContainer = (props) => {
  const avatarUrl = `https://robohash.org/${props.user.username}4?set=set5&size=30x30`;
  //   const renderAvatar = (chat, creds, next) => {
  //     const avatarUrl = `https://robohash.org/${props.user.username}4?set=set5&size=60x60`; // Replace with the actual URL
  //     return <img src={avatarUrl} alt="Avatar" />;
  //   };
  return (
    <div className="channelChatContainer">
      <PrettyChatWindow
        projectId="c18b96cf-f444-4fa1-b996-67a97fb9ca86"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
        // avatar={avatarUrl}
      />
    </div>
  );
};

export default ChannelChatContainer;
