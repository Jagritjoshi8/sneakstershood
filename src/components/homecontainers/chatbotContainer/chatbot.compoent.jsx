// Chatbot.js

import React, { useState } from "react";
import "./chatbot.styels.scss"; // Import your styles
import Tooltip from "@mui/material/Tooltip";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`chat-icon ${isOpen ? "open" : ""}`}
        onClick={toggleChatbot}
        // data-aos="fade-up"
        // data-aos-duration="2500"
      >
        {/* Your round chat icon (e.g., a circle) */}
        {!isOpen ? (
          <Tooltip title="Click To Open Chat Bot" placement="left" arrow>
            <div className="circle">
              <img src="https://th.bing.com/th/id/OIP.-vOGupUmcl2caJLvp68SfQHaHn?pid=ImgDet&w=163.99132321041216&h=180&c=7" />
            </div>
          </Tooltip>
        ) : (
          <Tooltip title="Click To Close Chat Bot" placement="left" arrow>
            <div className="circle">
              {" "}
              <img
                src="https://openclipart.org/image/2400px/svg_to_png/245681/closebtn.png"
                height="320px"
                width="600"
                className="closebtnimg"
              />
            </div>
          </Tooltip>
        )}
      </div>
      <div className={`chatbot ${isOpen ? "open" : ""}`}>
        <iframe
          title="Dialogflow Chatbot"
          width="380"
          height="530"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/1d01eb60-af54-4592-8f6d-f9e99c4c0b3e"
        ></iframe>
      </div>
    </div>
  );
};

export default Chatbot;

// // Chatbot.js

// import React from "react";

// const Chatbot = () => {
//   return (
//     <div className="chatbot">
//       <iframe
//         title="Dialogflow Chatbot"
//         width="550"
//         height="630"
//         allow="microphone;"
//         src="https://console.dialogflow.com/api-client/demo/embedded/1d01eb60-af54-4592-8f6d-f9e99c4c0b3e"
//       ></iframe>
//     </div>
//   );
// };

// export default Chatbot;
