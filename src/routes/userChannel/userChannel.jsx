import React, { useState } from "react";
import "./userChannel.scss";

import ChannelChatContainer from "../../components/SellerComponents/sellerChannelComponents/channelChatContainer/channelChat.component";

import UserChannelAuthContainer from "../../components/userChannelComponent/userChannelAuthComponet/userChannelAuth.component";

const UserChannel = () => {
  const [user, setUser] = useState();
  // return <ChatsPage user={user} />;
  if (!user) {
    return (
      <div className="userchannelbackground">
        <UserChannelAuthContainer onAuth={(user) => setUser(user)} />
      </div>
    );
  } else {
    return <ChannelChatContainer user={user} />;
  }
};

export default UserChannel;
