import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { handleExportExcel } from "../../common/ExcelFunction";
import { handleExportPDF } from "../../common/ConvertPDF";

export default function AllJobsReports() {
  const token = useSelector(selectCurrentToken);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [apiResponse, setApiResponse] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [keywordData, setKeywordData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [pageCount] = useState(2);
  const contentRef = useRef(null);
  const initialValues = {
    creationStartDate: "",
    creationEndDate: "",
    publishStartDate: "",
    publishEndDate: "",
    authorName: "",
    keyword: "",
    limit: 5,
    currentPage: 1,
  };

  const [state, setState] = useState(initialValues);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const allJobReportsData = async (page) => {
    const response = await axios.get(
      `${baseURL}/report/get-all-jobs-report?creation_start_date=${state.creationStartDate}&creation_end_date=${state.creationEndDate}&published_start_date=${state.publishStartDate}&published_end_date=${state.publishEndDate}&author_name=${state.authorName}&keyword=${state.keyword}&limit=${state.limit}&page=${page}`,
      config
    );
    // console.log(response?.data.Total_Pages, "response======");
    setTotalCount(response?.data.Total_Pages);
    setApiResponse(response?.data?.data);
    setAuthorData(response?.data.Authors);
    setKeywordData(response?.data.Keywords);
  };
  const handlePageClick = (e) => {
    setState({ ...state, currentPage: e.selected + 1 });
  };
  useEffect(() => {
    // allJobReportsData();
    allJobReportsData(state.currentPage);
  }, [state.limit, state.currentPage]);
  return (
    <>
      <DashboardLayout>
        <section className="job_reports_sec rounded py-3">
          <div className="row">
            <div className="col-md-12">
              <div className="head">
                <h6 className="px-3">All Jobs Reports</h6>
                <hr />
              </div>
            </div>

            <div className="col-md-12 mb-4">
              <div className="table_head d-md-flex d-block justify-content-between px-3">
                <div className="d-flex flex-wrap  gap-3 mb-3 mb-md-0">
                  <select
                    className="form-select shadow-none"
                    aria-label="Default select example"
                  >
                    <option defaultValue>All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>

                  {/* filter button */}
                  <button
                    className="btn_filter"
                    data-bs-toggle="modal"
                    data-bs-target="#FilterModal"
                  >
                    Filter
                    <img
                      className="ms-2"
                      src="/images/icons/filter.svg"
                      alt="icon"
                    />
                  </button>

                  <div className="form__box d-md-flex d-block gap-3">
                    <div className="input-group rounded cus_width mb-3 mb-md-0">
                      <input
                        type="date"
                        className="form-control  shadow-none border-0"
                        value={state.creationStartDate}
                        onChange={(e) =>
                          setState({
                            ...state,
                            creationStartDate: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="input-group rounded cus_width mb-3 mb-md-0">
                      <input
                        type="date"
                        className="form-control  shadow-none border-0"
                      />
                    </div>
                    {/* --- BLUE SEARC BUTTON ---- */}
                    {/* <div className="search__box mb-3 mb-md-0">
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
                    </div> */}
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mb-2 mb-md-0">
                  <button className="btn_export " type="button"
                  onClick={()=>handleExportExcel(apiResponse)}
                  >
                    Export as Excel
                    <img
                      src="/images/icons/download.svg"
                      alt="icon"
                      className="ms-2"
                    />
                  </button>

                  <button className="btn_export " type="button"
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
            </div>
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table text-center" ref={contentRef}>
                  <thead>
                    <tr>
                      <th scope="col">Job Title</th>
                      <th scope="col">Date of Creation</th>
                      <th scope="col">Evaluator</th>
                      <th scope="col">Uploader</th>
                      <th scope="col">Author</th>
                      <th scope="col">On Whose Desk</th>
                      <th scope="col">Words</th>
                      <th scope="col">Per Word Payout</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Date of Publishing</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {apiResponse?.map((val, i) => {
                      return (
                        <tr key={i}>
                          <td className="border-start-0">{val?.blogTitle}</td>
                          <td>{val.dateOfCreation}</td>
                          <td>{val.EvaluatorName}</td>
                          <td>{val.uploader}</td>
                          <td>{val.AuthorName}</td>
                          <td>{val.onWhoseDesk}</td>
                          <td>{val.wordCount}</td>
                          <td>Evaluator</td>
                          <td>{val.amount}</td>
                          <td>
                            <span className="green_box px-2 py-1">
                              {val.paidOn}
                            </span>
                          </td>
                          <td>{val.dateOfPublishing}</td>
                        </tr>
                      );
                    })}
                  </tbody> */}
                  <tbody>
                    {apiResponse?.length > 0 ? (
                      apiResponse
                        ?.filter((val) => {
                          if (state.creationStartDate === "") {
                            return val;
                          } else if (
                            val?.dateOfCreation.includes(
                              state.creationStartDate ||
                                val?.publishStartDate.includes(
                                  state.publishStartDate
                                )
                            )
                          ) {
                            return val;
                          }
                        })
                        .map((val, i) => {
                          // console.log(val, "valueeffdhvg");
                          return (
                            <tr key={i}>
                              <td className="border-start-0">
                                {val?.blogTitle}
                              </td>
                              <td>{val.dateOfCreation}</td>
                              <td>{val.EvaluatorName}</td>
                              <td>{val.uploader}</td>
                              <td>{val.AuthorName}</td>
                              <td>{val.onWhoseDesk}</td>
                              <td>{val.wordCount}</td>
                              <td>Evaluator</td>
                              <td>{val.amount}</td>
                              <td>
                                <span className="green_box px-2 py-1">
                                  {val.paidOn}
                                </span>
                              </td>
                              <td>{val.dateOfPublishing}</td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr> No Record is Found </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-col-md-12">
              <div className="table_pagination d-md-flex d-block justify-content-between px-3">
                <div className="select__box d-flex mb-3 mb-md-0 gap-2 align-items-center">
                  <span>Showing 1 to 10 of 100 entries</span>
                </div>
                <div>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    pageRangeDisplayed={2}
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
        </section>
      </DashboardLayout>

      {/* <!-- Filter Modal --> */}
      <div
        className="modal modal__edit fade"
        id="FilterModal"
        tabIndex="-1"
        aria-labelledby="FilterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header border-0 ">
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-5">
              <h5 className="modal-title mb-1" id="FilterModalLabel">
                Job Creation Date
              </h5>
              <div className="row mb-3">
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      Start Date{" "}
                    </label>
                    <div className="input-group p-0">
                      <input
                        type="date"
                        className="form-control shadow-none"
                        value={state.creationStartDate}
                        onChange={(e) =>
                          setState({
                            ...state,
                            creationStartDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  {/* Start Date*/}
                </div>
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      End Date{" "}
                    </label>
                    <div className="input-group p-0">
                      <input
                        type="date"
                        className="form-control shadow-none"
                        value={state.creationEndDate}
                        onChange={(e) =>
                          setState({
                            ...state,
                            creationEndDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  {/* End Date*/}
                </div>
              </div>

              {/* ============================================== */}
              <h5 className="modal-title mb-1" id="FilterModalLabel">
                Job shared date
              </h5>
              <div className="row mb-3">
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      Start Date{" "}
                    </label>
                    <div className="input-group p-0">
                      <input type="date" className="form-control shadow-none" />
                    </div>
                  </div>
                  {/* Start Date*/}
                </div>
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      End Date{" "}
                    </label>
                    <div className="input-group p-0">
                      <input type="date" className="form-control shadow-none" />
                    </div>
                  </div>
                  {/* End Date*/}
                </div>
              </div>

              {/* ============================================== */}
              <h5 className="modal-title mb-1" id="editModalLabel">
                Job published date
              </h5>
              <div className="row mb-3">
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      Start Date{" "}
                    </label>
                    <div className="input-group p-0">
                      <input
                        type="date"
                        className="form-control shadow-none"
                        value={state.publishStartDate}
                        onChange={(e) =>
                          setState({
                            ...state,
                            publishStartDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  {/* Start Date*/}
                </div>
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      End Date{" "}
                    </label>
                    <div className="input-group p-0">
                      <input
                        type="date"
                        className="form-control shadow-none"
                        value={state.publishEndDate}
                        onChange={(e) =>
                          setState({ ...state, publishEndDate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {/* End Date*/}
                </div>
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      Author Name
                    </label>
                    <select
                      className="form-select shadow-none"
                      aria-label="Default select example"
                    >
                      <option value="1">Select</option>
                      {authorData?.map((items) => {
                        return (
                          <option
                            value={items}
                            key={items}
                            onChange={(e) =>
                              setState({ ...state, authorName: e.target.value })
                            }
                          >
                            {items}
                          </option>
                        );
                      })}
                      <option value="2">testing</option>
                    </select>
                  </div>
                  {/* Author Name*/}
                </div>
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      Keyword
                    </label>
                    <select
                      className="form-select shadow-none"
                      aria-label="Default select example"
                    >
                      <option value="1">Select</option>
                      {keywordData?.map((item) => {
                        return (
                          <option
                            value={item}
                            key={item}
                            onChange={(e) =>
                              setState({ ...state, authorName: e.target.value })
                            }
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Keyword*/}
                </div>
                <div className="col-md-12">
                  <div className="d-flex gap-3 py-3">
                    <button
                      type="button"
                      className="btn_filter"
                      data-bs-dismiss="modal"
                      onClick={allJobReportsData}
                    >
                      Filter
                      <img
                        src="/images/icons/filter.svg"
                        alt="filter-icon"
                        className="ms-2"
                      />
                    </button>
                    <button type="button" className="btn_reset">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              {/* Job shared date */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
