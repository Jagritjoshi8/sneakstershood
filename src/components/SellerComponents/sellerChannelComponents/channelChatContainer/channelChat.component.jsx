import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChannelChatContainer = (props) => {
  return (
    <div style={{ height: "100vh", width: "85vw" }}>
      <PrettyChatWindow
        projectId="c18b96cf-f444-4fa1-b996-67a97fb9ca86"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChannelChatContainer;
