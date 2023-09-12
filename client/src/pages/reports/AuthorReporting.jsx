import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ReactPaginate from "react-paginate";
import { useGetAllReportsQuery } from "./reportingApiSlice";
import { useSelector } from "react-redux";
import Reports from "./Reports";
import axios from "axios";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { handleExportExcel } from "../../common/ExcelFunction";
import { handleExportPDF } from "../../common/ConvertPDF";

export default function AuthorReporting() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const contentRef = useRef(null);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [apiResponse, setApiResponse] = useState();
  const [totalCount, setTotalCount] = useState("");
  const token = useSelector(selectCurrentToken);
  const [pageCount] = useState(2);

  let limit = 5;
  // const {
  //   data: reports,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetAllReportsQuery();

  let dataContent;

  const response = async (currentPage) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await axios.get(
      `${baseURL}/report/get-all-author-report?search=${searchData}&start_date=${startDate}&end_date=${endDate}&limit=${limit}&page=${currentPage}`,
      config
    );
    setTotalCount(result?.data?.Total_Pages);
    setApiResponse(result?.data?.data);
    // const date = new Date(comment?.createdAt).toLocaleDateString("en-us",options);
    // let filterIdsData;

    // filterIdsData = ids?.filter((id) => entities[id]);
    // const tableData = ids?.length ? (
    //   filterIdsData.map((reportId) => (
    //     <Reports key={reportId} reportId={reportId} />
    //   )) // -- send data from here to report component.
    // ) : (
    //   <p className="mt-3 ">No Result Found</p>
    // );
    // content = (
    //   <table className="table text-center">
    //     <thead>
    //       <tr>
    //         <th scope="col">
    //           <div className="form-check ms-2">
    //             <input
    //               className="form-check-input shadow-none"
    //               type="checkbox"
    //               value=""
    //               id="flexCheckDefault"
    //             />
    //           </div>
    //         </th>
    //         <th scope="col">code</th>
    //         <th scope="col">Name</th>
    //         <th scope="col">Mail ID</th>
    //         <th scope="col">Phone Number</th>
    //         <th scope="col">No. of Blogs Submitted</th>
    //         <th scope="col">No. of Blogs Published</th>
    //         <th scope="col">Amount Paid</th>
    //         <th scope="col">Activity Status</th>
    //       </tr>
    //     </thead>
    //     <tbody>{tableData}</tbody>
    //   </table>
    // );
  };

  // if (isLoading) {
  //   dataContent = <p>Loading...........</p>;
  // }
  // if (isError) {
  //   dataContent = <p>{error?.message} </p>;
  // }
  // if (isSuccess) {
  //   // console.log("successfully data fetched --------")
  //   const { ids, entities } = reports;
  //   console.log("ids", entities);

  //   let filterIdsData;

  //   filterIdsData = ids?.filter((id) => entities[id]);
  //   console.log(filterIdsData, "filtered data id");
  //   const tableData = ids?.length ? (
  //     filterIdsData?.map((reportId) => (
  //       <Reports key={reportId} reportId={reportId} />
  //     ))
  //   ) : (
  //     <p className="mt-3 ">No Result Found</p>
  //   );
  //   dataContent = (
  //     <table className="table text-center">
  //       <thead>
  //         <tr>
  //           <th scope="col">
  //             <div className="form-check ms-2">
  //               <input
  //                 className="form-check-input shadow-none"
  //                 type="checkbox"
  //                 value=""
  //                 id="flexCheckDefault"
  //               />
  //             </div>
  //           </th>
  //           <th scope="col">code</th>
  //           <th scope="col">Name</th>
  //           <th scope="col">Mail ID</th>
  //           <th scope="col">Phone Number</th>
  //           <th scope="col">No. of Blogs Submitted</th>
  //           <th scope="col">No. of Blogs Published</th>
  //           <th scope="col">Amount Paid</th>
  //           <th scope="col">Activity Status</th>
  //         </tr>
  //       </thead>
  //       <tbody>{tableData}</tbody>
  //     </table>
  //   );
  // }

  const handleSearch = (event) => {
    setSearchData(event.target.value);
  };
  const handleDateSearch = (e) => {
    setStartDate(e.target.value);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  const handleEndDateSearch = (e) => {
    setEndDate(e.target.value);
  };
  useEffect(() => {
    response(currentPage);
  }, [searchData, startDate, endDate, limit, currentPage]);
  return (
    <>
      <DashboardLayout>
        <section className="author_reports_sec rounded py-3">
          <div className="row">
            <div className="col-md-12">
              <div className="head">
                <h6 className="px-3">Author Reports</h6>
                <hr />
              </div>
            </div>
            <div className="col-md-12">
              <div className=" table__job py-2 px-0">
                <div className="table__head mb-4  px-3 d-xxl-flex d-block justify-content-between align-items-center">
                  <div className="d-xl-flex d-block  gap-3">
                    <div className="d-md-flex d-block gap-2 mb-3 mb-xl-0">
                      {/* <select
                        className="form-select shadow-none mb-3 mb-md-0"
                        aria-label="Default select example"
                      >
                        <option defaultValue>All</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select> */}

                      <div className="input-group rounded cus_width">
                        <span
                          className="input-group-text bg-transparent border-0"
                          id="basic-addon1"
                        >
                          <img src="/images/icons/search.svg" alt="icon" />
                        </span>
                        <input
                          type="text"
                          className="form-control bg-
                          
                          shadow-none border-0"
                          placeholder="search ..."
                          onChange={handleSearch}
                        />
                      </div>
                    </div>

                    <div className="form__box d-md-flex d-block gap-3">
                      <div className="input-group rounded cus_width mb-3 mb-md-0">
                        <input
                          type="date"
                          className="form-control  shadow-none border-0"
                          onChange={handleDateSearch}
                        />
                      </div>

                      <div className="input-group rounded cus_width mb-3 mb-md-0">
                        <input
                          type="date"
                          className="form-control  shadow-none border-0"
                          onChange={handleEndDateSearch}
                        />
                      </div>
                      {/* 
                      <div className="search__box mb-3 mb-md-0">
                        <div
                          className="input-group rounded "
                          style={{ backgroundColor: "var(--blue)" }}
                        >
                          <button
                            // type="text"
                            className="form-control bg-transparent shadow-none border-0"
                            // placeholder="Search"
                            style={{ color: "var(--white)" }}
                          >
                            {" "}
                            Search{" "}
                          </button>
                          <span
                            className="input-group-text bg-transparent border-0"
                            id="basic-addon1"
                          >
                            {" "}
                          </span>
                        </div>
                      </div> */}
                    </div>

                    {/* Start from */}
                  </div>

                  <div className="d-flex flex-wrap gap-3 mt-4 mt-xxl-0">
                    <button
                      className="btn_export"
                      type="button"
                      onClick={() => handleExportExcel(apiResponse)}
                    >
                      Export as Excel
                      <img
                        src="/images/icons/download.svg"
                        alt="icon"
                        className="ms-2"
                      />
                    </button>

                    <button
                      className="btn_export"
                      type="button"
                      onClick={() => handleExportPDF(contentRef)}
                    >
                      Export as PDF
                      <img
                        src="/images/icons/download.svg"
                        alt="icon"
                        className="ms-2"
                      />
                    </button>
                  </div>
                </div>

                <div className="table-responsive">{dataContent}</div>
                <div className="table-responsive" id="my-table-id">
                  <table className="table text-center" ref={contentRef}>
                    <thead>
                      <tr>
                        <th scope="col">code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mail ID</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">No. of Blogs Submitted</th>
                        <th scope="col">No. of Blogs Published</th>
                        <th scope="col">Amount Paid</th>
                        <th scope="col">Activity Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiResponse?.length > 0 ? (
                        apiResponse
                          ?.filter((val) => {
                            if (searchData === "") {
                              return val;
                            } else if (
                              val.name
                                .toLowerCase()
                                .includes(searchData.toLowerCase()) ||
                              val.email
                                .toLowerCase()
                                .includes(searchData.toLowerCase())
                            ) {
                              return val;
                            }
                          })
                          .map((val, i) => {
                            return (
                              <tr key={i}>
                                <td>#{val?._id.slice(-4)}</td>
                                <td>{val.name}</td>
                                <td>{val.email}</td>
                                <td>{val.mobile}</td>
                                <td>{val.numOfBlogSubmitted}</td>
                                <td>{val.numOfBlogPublished}</td>
                                <td>{val.job_assign_Data.paidOn}</td>
                                <td>{val.status}</td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr> No Record is Found</tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="table_pagination d-md-flex d-block justify-content-between px-3">
                  <div className="select__box d-flex mb-3 mb-md-0 gap-2 align-items-center">
                    <span>Showing</span>
                    <select
                      className="form-select shadow-none"
                      aria-label="Default select example"
                    >
                      <option defaultValue>13</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <span>of 50</span>
                  </div>

                  <div>
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=" >"
                      pageCount={pageCount}
                      itemOffset={30}
                      previousLabel="<"
                      renderOnZeroPageCount={null}
                      onPageChange={handlePageClick}
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
            {/* ======JOB"S TABLE BOX====== */}
          </div>
        </section>
      </DashboardLayout>
    </>
  );
}
