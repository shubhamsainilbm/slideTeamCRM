import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ReactPaginate from "react-paginate";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { handleExportExcel } from "../../common/ExcelFunction";
import { handleExportPDF } from "../../common/ConvertPDF";

export default function AuthorJobSubmissionReport() {

  const [apiResponse, setApiResponse] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [searchData, setSearchData] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const token = useSelector(selectCurrentToken);
  const contentRef = useRef(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let limit = 5;
  const submissionReport = async (page) => {
    const result = await axios.get(
      `${baseURL}/report/get-all-author-job-submission-report?search=${searchData}&start_date=${startDate}&end_date=${endDate}&limit=${limit}&page=${page}`,
      config
    );
    setTotalCount(result?.data?.Total_Pages);
    setApiResponse(result?.data?.data);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date().toLocaleDateString("en-us", options);
    console.log(date, "date");

  };

  const handleSearch = (event) => {
    setSearchData(event.target.value);
  };
  const handleStartDateSearch = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateSearch = (e) => {
    setEndDate(e.target.value);
  };
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  useEffect(() => {
    submissionReport(currentPage);
  }, [searchData, startDate, endDate, limit, currentPage]);

  return (
    <>
      <DashboardLayout>
        <section className="author_reports_sec rounded py-3">
          <div className="row">
            <div className="col-md-12">
              <div className="head">
                <h6 className="px-3">Author Job Submission Report</h6>
                <hr />
              </div>
            </div>
            <div className="col-md-12">
              <div className=" table__job py-2 px-0">
                <div className="table__head mb-4  px-3 d-xxl-flex d-block justify-content-between align-items-center">
                  <div className="d-xl-flex d-block  gap-3">
                    <div className="d-md-flex d-block gap-2 mb-3 mb-xl-0">
                      <select
                        className="form-select shadow-none mb-3 mb-md-0"
                        aria-label="Default select example"
                      >
                        <option defaultValue>All</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>

                      <div className="input-group rounded cus_width">
                        <span
                          className="input-group-text bg-transparent border-0"
                          id="basic-addon1"
                        >
                          <img src="/images/icons/search.svg" alt="icon" />
                        </span>
                        <input
                          type="text"
                          className="form-control bg-transparent shadow-none border-0"
                          placeholder="search..."
                          onChange={handleSearch}
                        />
                      </div>
                    </div>

                    <div className="form__box d-md-flex d-block gap-3">
                      <div className="input-group rounded cus_width mb-3 mb-md-0">
                        <input
                          type="date"
                          className="form-control  shadow-none border-0"
                          onChange={handleStartDateSearch}
                        />
                      </div>

                      <div className="input-group rounded cus_width mb-3 mb-md-0">
                        <input
                          type="date"
                          className="form-control  shadow-none border-0"
                          onChange={handleEndDateSearch}
                        />
                      </div>

                      <div className="search__box mb-3 mb-md-0">
                        <div
                          className="input-group rounded "
                          style={{ backgroundColor: "var(--blue)" }}
                        >
                          <input
                            type="text"
                            className="form-control bg-transparent shadow-none border-0"
                            placeholder="Search"
                            style={{ color: "var(--white)" }}
                          />
                          <span
                            className="input-group-text bg-transparent border-0"
                            id="basic-addon1"
                          >
                            <img src="/images/icons/w-search.svg" alt="icon" />
                          </span>
                        </div>
                      </div>
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
                      onClick={()=>handleExportPDF(contentRef)}
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

                <div className="table-responsive">
                  <table className="table text-center" ref={contentRef}>
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Evaluator</th>
                        <th scope="col">Word Count</th>
                        <th scope="col">Date Of Publishing</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Paid On</th>
                        <th scope="col">URL</th>
                        <th scope="col">Active Member</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiResponse?.length > 0 ? (
                        apiResponse
                          ?.filter((val) => {
                            if (searchData === "") {
                              return val;
                            } else if (
                              val.blogTitle
                                .toLowerCase()
                                .includes(searchData.toLowerCase())
                            ) {
                              return val;
                            }
                          })
                          .map((val, index) => {
                            return (
                              <tr key={index}>
                                <td>{val?.blogTitle}</td>
                                <td>{val?.EvaluatorName}</td>
                                <td>{val?.wordCount}</td>
                                <td>{val?.dateOfPublishing}</td>
                                <td>{val?.amount}</td>
                                <td>{val?.paidOn}</td>
                                <td>{val?.url}</td>
                                <td>{val?.activeMember}</td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr> No Record is Found </tr>
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
                      pageRangeDisplayed={2}
                      pageCount={pageCount} // number of pages is showed.
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
