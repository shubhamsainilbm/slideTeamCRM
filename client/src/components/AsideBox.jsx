import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateChatMutation,
  useGetChatUsersQuery,
} from "../features/chats/chatsApiSlice";
import UserLists from "../features/chats/UserLists";
import UserChatList from "../features/chats/UserChatList";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

export default function AsideBox({ fetchAgain, setFetchAgain }) {
  const { id, key } = useParams();
  console.log("iddd", id);
  const [choosecontact, setChooseContact] = useState(true);
  const [searchData, setSearchData] = useState("");
  // const [search, setSearch] = useState("");
  const [searchResultData, setSearchDResultata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  // const [select, setSelect] = useState({
  //   //  id: "1",
  //   name: "Select Contact",
  // });
  // let industryList = [
  //   { id: 1, name: "None" },
  //   { id: 2, name: "Rampawan(919356199222)" },
  //   { id: 3, name: "Arti Chandel(3197210521511)" },
  // ];

  const [openSearch, setOpenSearch] = useState(false);
  const onSearchOpen = () => {
    setOpenSearch(!openSearch);
  };

  // const { data, isSuccess, isLoading } = useGetChatUsersQuery(searchData);
  // const [createChat] = useCreateChatMutation();
  // const [searchResultData, setSearchDResultata] = useState([]);
  //   const [selectedChat, setSelectedChat] = useState([]);
  // const { setSelectedChat, notification, setNotification, chats, setChats } =
  //   ChatState();
  const token = useSelector(selectCurrentToken);
  const handleSearch = async () => {
    // if (!searchData) {
    //   return toast.error("Search Field is required");
    // }
    // try {
    //   if (isSuccess) {
    //     console.log("object", data);
    //     setSearchDResultata(data);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    console.log("firstDAtaaaaa", searchData);
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/user/get-chat-users/${key}/${id}?search=${searchData}`,
      config
    );
    console.log("dataaaaaaaaaaaa", data);
    setLoading(false);
    setSearchDResultata(data);
  };
  const accessChat = async (userId) => {
    console.log("userId", userId);
    // try {
    //   const { data } = await createChat({ userId: userId });
    //   if (!chats.find((chat) => chat._id === data._id))
    //     setChats([data, ...chats]);
    //   console.log("userId", data);
    //   setSelectedChat(data);
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/chats/create-chat`,
        { userId, jobId: id },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      // onClose();
    } catch (error) {
      toast.error("Error fetching the chat");
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchData]);

  return (
    <>
      <div className="aside_component">
        <div className="main_head pt-0 px-2">
          {/* ========== CHAT HEAD ========== */}
          <div className="head pb-2">
            <h3 className="mb-3">Chats</h3>
            {/* ========== ADD NEW CONTACT BOX ========== */}

            {/* ========== SEARCH BOX ========== */}

            <div
              className="search_box form_box"
              onClick={onSearchOpen}
              style={{ position: "relative" }}
            >
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search contact"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  // onClick={handleSearch}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14"
                    width="14"
                    style={{ fill: " var(--text-grey)" }}
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </span>
              </div>
              {openSearch && (
                <div
                  style={{
                    backgroundColor: "white",
                    // height: "200px",
                    position: "absolute",
                    right: "0px",
                    left: "0px",
                    zIndex: 1,
                    // border: "1px solid #ccc",
                    borderRadius: "3px",
                    padding: "10px",
                  }}
                >
                  {loading
                    ? "Loading..."
                    : [searchResultData]?.map((item) => (
                        <UserLists
                          fetchAgain={fetchAgain}
                          key={item._id}
                          user={item}
                          handleClick={() => accessChat(item._id)}
                        />
                      ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========== CHAT LIST BOX ========== */}
        <UserChatList />

        {/* <!--========== Filter Conversations Modal ==========--> */}
        <div
          className="modal filter__modal fade"
          id="FilterModal"
          tabIndex="-1"
          aria-labelledby="FilterModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content px-3">
              <div className="modal-header">
                <h5 className="modal-title" id="FilterModalLabel">
                  Filter Conversations
                </h5>
                <button
                  type="button"
                  className="btn_close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    style={{ fill: "var(--black)" }}
                    viewBox="0 0 384 512"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <button className="add_segment rounded mb-4" type="button">
                  Add new Segment +
                </button>

                {/* Show old chats first */}
                <div className="form-check d-flex gap-2 align-item-center">
                  <input
                    className="form-check-input shadow-none"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Show old chats first
                  </label>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn_apply"
                  data-bs-dismiss="modal"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
