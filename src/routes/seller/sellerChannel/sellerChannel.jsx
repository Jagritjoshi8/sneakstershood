import React, { useState } from "react";
import "./sellerChannel.styles.scss";
import ChannelAuthContainer from "../../../components/SellerComponents/sellerChannelComponents/channelAuthComponent/channelAuth.component";
import ChannelChatContainer from "../../../components/SellerComponents/sellerChannelComponents/channelChatContainer/channelChat.component";

const SellerChannel = () => {
  const [user, setUser] = useState();
  if (!user) {
    return (
      <div className="seller-channel-background">
        <ChannelAuthContainer onAuth={(user) => setUser(user)} />
      </div>
    );
  } else {
    return <ChannelChatContainer user={user} />;
  }
};

export default SellerChannel;
