import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import ReactPaginate from "react-paginate";
import UsersData from "../../assets/json/user-data.json";
import { selectAllUsers, useGetUsersQuery } from "./usersApiSlice";
import Users from "./Users";

import AddUser from "./AddUser";
import useAuth from "../../hooks/useAuth";
import { rolesList } from "../../config/rolesList";
import InputField from "../../components/InputField";
import CheckBox from "../../components/CheckBox";
import { useSelector } from "react-redux";

export default function UsersList() {
  const { userRole } = useAuth();
  const [checkBoxVal, setCheckBoxVal] = useState([]);
  const [inputVal, setInputVal] = useState("");
  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [filterDropDown, setFilterDropDown] = useState();
  console.log(pageCount);
  const ref = useRef([]);
  const userCount = useSelector((state) => selectAllUsers(state)).length;
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(
    checkBoxVal.join("&") +
      "&search=" +
      inputVal +
      "&page=" +
      currentPage +
      "&limit=" +
      limit
  );
  let content;
  if (isLoading) {
    content = (
      <>
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }
  if (isError) {
    content = <p>{error?.message}</p>;
  }
  useEffect(() => {
    setPageCount(Math.ceil(userCount / limit));
  }, [userCount]);
  // console.log("usersklllllllll", users);
  if (isSuccess) {
    const { ids, entities } = users;

    let filterUsers = ids.filter((userId) => entities[userId].role !== "admin");
    // console.log("filterUsers", filterUsers);

    const tableData = ids?.length ? (
      filterUsers.map((userId) => <Users key={userId} userId={userId} />)
    ) : (
      <p className="mt-3 ">No Result Found</p>
    );
    console.log(entities);
    content = (
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Mail ID</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {isLoading ? "Loading.." : <tbody>{tableData}</tbody>}
      </table>
    );
  }
  let arrVal = [];
  const handleCheckBoxChange = (e) => {
    const { name, value, checked } = e.target;
    let checkVal = `role=${value}`;
    if (checked === true) {
      arrVal.push(checkVal);
      setCheckBoxVal((currEle) => [...currEle, arrVal]);
    } else {
      let index = arrVal.indexOf(checkVal);
      if (index > -1) {
        arrVal.splice(index, 1);
      }
      setCheckBoxVal((currEle) => [...currEle.splice(index++)]);
    }
  };
  console.log("sds", checkBoxVal);
  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };
  const resetFilter = () => {
    setCheckBoxVal([]);
    ref.current.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handlePageClick = (event) => {
    const countNumber = event.selected + 1;
    setCurrentPage(countNumber);
  };

  const filterDropDownShow = () => {
    setFilterDropDown(!filterDropDown);
  };
  const filterDropDownHide = () => {
    setFilterDropDown(filterDropDown);
  };
  return (
    <>
      <DashboardLayout>
        <section className="user_detail_sec rounded py-3">
          <div className="row">
            <div className="col-md-12">
              <div
                className="head px-3 mb-3"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h6>All Users</h6>
                <AddUser />
              </div>
            </div>

            <div className="col-md-12">
              <div className="table__head mb-4  px-3 d-md-flex d-block justify-content-between align-items-start">
                <div className="d-flex flex-wrap gap-3 mb-3 mb-md-0">
                  <div className="user__filters dropdown">
                    <div
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <InputField
                        type={"text "}
                        labelNone={"none"}
                        placeholder={"Filter By Role's"}
                      />
                    </div>

                    <div className="user__filters__checkbox dropdown-menu">
                      <CheckBox
                        ref={(element) => {
                          ref.current.push(element);
                        }}
                        labelName={"Sub Admin"}
                        iD={"sub-admin"}
                        name={"sub-admin"}
                        value={"sub-admin"}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                      <CheckBox
                        ref={(element) => {
                          ref.current.push(element);
                        }}
                        labelName={"Keyword Analyst"}
                        iD={"keyword-analyst"}
                        name={"keyword-analyst"}
                        value={"keyword-analyst"}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                      <CheckBox
                        ref={(element) => {
                          ref.current.push(element);
                        }}
                        labelName={"Job Allocator"}
                        iD={"job-allocator"}
                        name={"job-allocator"}
                        value={"job-allocator"}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                      <CheckBox
                        ref={(element) => {
                          ref.current.push(element);
                        }}
                        labelName={"Author"}
                        iD={"author"}
                        name={"author"}
                        value={"author"}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                      <CheckBox
                        ref={(element) => {
                          ref.current.push(element);
                        }}
                        labelName={"Evaluator"}
                        iD={"evaluator"}
                        name={"evaluator"}
                        value={"evaluator"}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                      <CheckBox
                        ref={(element) => {
                          ref.current.push(element);
                        }}
                        labelName={"Analyst"}
                        iD={"analyst"}
                        name={"analyst"}
                        value={"analyst"}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn_filter"
                    onClick={resetFilter}
                  >
                    Reset Filter
                  </button>
                  {/* <button type="button" className="btn_filter">
                    Job Allocator
                  </button>
                  <button type="button" className="btn_filter">
                    Author
                  </button>
                  <button type="button" className="btn_filter">
                    Evaluator
                  </button>
                  <button type="button" className="btn_filter">
                    Analyst
                  </button> */}
                </div>

                {/* Start from */}

                <div
                  className="search_box"
                  style={{ maxWidth: "350px", width: "100%" }}
                >
                  <div className="input-group">
                    <span className="input-group-text rounded bg-transparent border-0">
                      <img src="/images/icons/search.svg" alt="icon" />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-transparent shadow-none border-0"
                      placeholder="Search By name and email"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="table-responsive">{content}</div>

              <div className="table_pagination d-md-flex d-block justify-content-between px-3">
                <div className="select__box  mb-3 mb-md-0 ">
                  <span>{`Showing 1 to 10 of ${userCount} entries`}</span>
                </div>

                <div>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    // itemOffset={10}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={`page-link`}
                    previousClassName={"page-item"}
                    previousLinkClassName={`page-link`}
                    nextClassName={"page-item"}
                    nextLinkClassName={`page-link`}
                    breakClassName={"page-item"}
                    breakLinkClassName={`page-link`}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </>
  );
}
