import React, { useEffect, useState } from "react";
import { useGetChatUsersQuery, useGetChatsQuery } from "./chatsApiSlice";
import useAuth from "../../hooks/useAuth";
import { ChatState } from "../../context/ChatProvider";
import { selectCurrentToken } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserChatList = ({ fetchAgain }) => {
  const { userId } = useAuth();
  const { id, key } = useParams();
  console.log("sasas", key);
  const token = useSelector(selectCurrentToken);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  // const {
  //   data: getchats,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetChatsQuery();
  //   const [chats, setChats] = useState(getchats);
  // useEffect(() => {
  //   setChats(getchats);
  // }, [chats, getchats]);

  let content;
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/chats/get-chats`,
        config
      );
      setChats(data);
    } catch (error) {
      toast.error("Failed to Load the chats");
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  // if (isLoading) {
  //   content = <p>"Loading..."</p>;
  // }
  // if (isError) {
  //   content = <p>{error?.message}</p>;
  // }
  // console.log("objectasasas", chats);
  content = (
    <div className="chat_list_box">
      <ul className="list-unstyled">
        {chats?.map((items) => {
          console.log("first", items?.jobId);
          console.log(items?.users[0]?.image);
          return (
            <li key={items._id} onClick={() => setSelectedChat(items)}>
              {/* <Link to="/teaminbox" className="chat_box  d-flex align-items-center gap-3"> */}
              {/* console.log(items?.jobId) */}
              {items?.jobId === id && (
                <div
                  className={`${
                    selectedChat?._id === items?._id ? "chat_box" : "chat_box_"
                  }  d-flex align-items-center gap-3`}
                >
                  <div className="sender_img">
                    <span style={{ overflow: "hidden" }}>
                      {items?.users[0]?.image === "" ? (
                        <img
                          src={"/images/user.png"}
                          style={{ width: "25px" }}
                        />
                      ) : (
                        <img
                          src={items?.users[0]?.image}
                          style={{ width: "76px" }}
                        />
                      )}
                    </span>
                  </div>
                  <div className="sender_details">
                    <div className="sender_name d-flex flex-column align-items-start gap-1">
                      <h6
                        className="mb-0"
                        style={{
                          fontSize: "16px",
                          textTransform: "capitalize",
                        }}
                      >
                        {items?.users[0]?._id === userId
                          ? items?.users[1]?.name
                          : items?.users[0]?.name}
                      </h6>
                      <p className="mb-0">
                        {items?.users[0]?._id === userId
                          ? items?.users[1]?.email
                          : items?.users[0]?.email}
                      </p>
                      <p className="mb-0 " style={{ fontSize: "14px" }}>
                        Role:{" "}
                        {items?.users[0]?._id === userId
                          ? items?.users[1]?.role
                          : items?.users[0]?.role}
                      </p>
                    </div>
                    {/* {items.latestMessage && (
                    <h6>
                      <b>{items?.latestMessage?.sender?.name} : </b>
                      {items?.latestMessage?.content?.length > 50
                        ? items?.latestMessage?.content.substring(0, 51) + "..."
                        : items?.latestMessage?.content}
                    </h6>
                  )} */}
                    {/* <span className="time_box">17/04/2023 4:43 PM</span> */}

                    {/* <div className="msg_detail d-flex align-items-center justify-content-between"> */}
                    {/* <div className="msg_detail mt-1">
                    Hey! there I'm available dummy text
                  </div> */}
                  </div>
                </div>
              )}
              {/* </Link> */}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return content;
};

export default UserChatList;
