import React from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatsConfig";
import useAuth from "../../hooks/useAuth";
import ScrollableFeed from "react-scrollable-feed";

const Messages = ({ messages }) => {
  const { userId } = useAuth();
  console.log("afasfasgfdfhf", messages);

  return (
    <>
      <ScrollableFeed className="ScrollChatDIv">
        {messages?.map((m, i) => {
          return (
            <div className="row mx-0" key={m._id}>
              {messages[i]?.sender?._id !== userId && (
                <div className="col-md-12 ">
                  <div className="receiver__main d-flex gap-3">
                    <div className="r_img">
                      <img
                        src={
                          m?.sender?.image === ""
                            ? `/images/user.png`
                            : m?.sender?.image
                        }
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="rec_box mb-3">
                      <p> {m?.message} </p>
                      <div className="text-start">
                        <span>
                          {" "}
                          {new Date(m?.createdAt)
                            .toLocaleDateString("en-us")
                            .replaceAll("/", "-")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {messages[i]?.sender?._id === userId && (
                <div className="col-md-12 text-end ChatClassBox">
                  <div className="d-flex align-items-center gap-3 justify-content-end">
                    <div className="sender_box mb-3 ">
                      <p>{m?.message} </p>
                      <span className="text-end">
                        {new Date(m?.createdAt)
                          .toLocaleDateString("en-us")
                          .replaceAll("/", "-")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </ScrollableFeed>
    </>
  );
};

export default Messages;
