import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import AsideBox from "../../components/AsideBox";
import { useGetMessagesQuery, useSendMessageMutation } from "./messageApiSlice";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";
import { toast } from "react-toastify";
import Messages from "./Messages";
import io from "socket.io-client";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
const ENDPOINT = import.meta.env.VITE_API_SOCKET;

console.log(ENDPOINT);
let socket, selectedChatCompare;
const Chats = () => {
  const { userId } = useAuth();
  const { key } = useParams();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const token = useSelector(selectCurrentToken);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();
  //   const { data: getMessages } = useGetMessagesQuery(selectedChat?.chatId);

  //   console.log("seleced Chat", getMessages);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userId);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/messages/get-all-messages/${
          selectedChat._id
        }`,
        config
      );
      // console.log("hghfjgfjgfjgfj", data);
      setMessages(data);
      setLoading(false);

      socket.emit("joinChat", selectedChat._id);
    } catch (error) {
      toast.error("Failed to Load the Messages");
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [fetchAgain, selectedChat]);

  const sendMessageOnEnter = async (e) => {
    if (e.key === "Enter" && newMessage) {
      e.preventDefault();
      socket.emit("stopTyping", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/messages/send-message`,
          {
            message: newMessage,
            chatId: selectedChat,
          },
          config
        );
        // console.log("messagesend", data);
        socket.emit("sendMessage", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Failed to send the Message");
      }
    }
    // if (e.key === "Enter" && newMessage) {
    //   e.preventDefault();
    //   try {
    //     const data = await sendMessage({
    //       chatId: selectedChat?.chatId,
    //       message: newMessage,
    //     });
    //     console.log("object", newMessage);
    //     console.log("selected", selectedChat?.chatId);
    //     console.log("data", data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };
  // console.log("selectedChat", selectedChat);

  const messageInputChange = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stopTyping", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket.on("messageRecived", (newMessageRecived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id === newMessageRecived.chat._id
      ) {
        if (!notification.includes(newMessageRecived)) {
          setNotification([newMessageRecived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecived]);
        console.log(
          "newMessageRecived-------------------------",
          newMessageRecived
        );
      }
    });
  });

  return (
    <DashboardLayout>
      <div class="" style={{ backgroundColor: "white" }}>
        <div class="modal-content">
          <div class="modal-body ">
            <div className="main_team_inbox d-md-flex d-block">
              <div
                className="aside_box d-none d-md-block d-lg-block d-xxl-block"
                style={{ width: "25%" }}
              >
                <AsideBox
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </div>

              <div className="go__back d-md-none d-lg-none  d-xxl-none ">
                <div
                  className="text-start ps-2 d-flex align-items-center gap-1"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14"
                    viewBox="0 0 448 512"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                  Back
                </div>
              </div>

              <div className="chat__box w-100 border rounded position-relative">
                <div className="head rounded d-flex justify-content-between align-items-center p-3">
                  <h6 className="mb-0">
                    {key === "EA"
                      ? "Evaluator-Author Chat"
                      : "Kw. Analyst-Author Chat"}
                  </h6>
                </div>
                {/* chat head */}
                {selectedChat ? (
                  <>
                    <div className="main_chat_body position-relative scroll">
                      <div className="chat_body py-2 position-absolute w-100">
                        <Messages messages={messages} />
                      </div>
                    </div>
                    {/* chat body */}

                    <div className="input_box position-absolute w-100">
                      <form
                        onKeyDown={sendMessageOnEnter}
                        className="input-group "
                      >
                        {isTyping ? "typing..." : <></>}
                        <input
                          type="text"
                          class="form-control shadow-none border-0"
                          placeholder="Type a message....."
                          value={newMessage}
                          onChange={messageInputChange}
                        />
                        <span
                          class="input-group-text border-0"
                          id="basic-addon2"
                        >
                          Send
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ms-2"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M2 13.3332V2.6665L14.6667 7.99984L2 13.3332ZM3.33333 11.3332L11.2333 7.99984L3.33333 4.6665V6.99984L7.33333 7.99984L3.33333 8.99984V11.3332Z"
                              fill="#44C025"
                            />
                          </svg>
                        </span>
                      </form>
                    </div>
                  </>
                ) : (
                  <p style={{ textAlign: "center", marginTop: "15px" }}>
                    Click to Preview Chat
                  </p>
                )}
              </div>
              {/* Input// send msg  */}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chats;
