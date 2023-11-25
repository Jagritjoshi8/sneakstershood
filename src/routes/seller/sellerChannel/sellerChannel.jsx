import React, { useState } from "react";
import ChannelAuthContainer from "../../../components/SellerComponents/sellerChannelComponents/channelAuthComponent/channelAuth.component";
import ChannelChatContainer from "../../../components/SellerComponents/sellerChannelComponents/channelChatContainer/channelChat.component";

const SellerChannel = () => {
  const [user, setUser] = useState();
  // return <ChatsPage user={user} />;
  if (!user) {
    return <ChannelAuthContainer onAuth={(user) => setUser(user)} />;
  } else {
    return <ChannelChatContainer user={user} />;
  }
};

export default SellerChannel;
