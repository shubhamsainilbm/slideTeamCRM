import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { handleExportPDF } from "../../common/ConvertPDF";
import { handleExportExcel } from "../../common/ExcelFunction";

export default function JobPublished() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const contentRef = useRef(null);
  const [apiResponse, setApiResponse] = useState([]);
  const [author, setAuthor] = useState([]);
  const [pageCount, setPageCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(10); //total data--

  const token = useSelector(selectCurrentToken);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const [totalData, setTotalData] = useState();

  const initialValues = {
    creationStartDate: "",
    creationEndDate: "",
    pulbishedStartDate: "",
    publishedEndDate: "",
    sharedStartDate: "",
    sharedEndDate: "",
    authorName: "",
    limit: 5,
  };
  const [state, setState] = useState(initialValues);
  const [nameOfAuthor, setNameOfAuthor] = useState();
  const [author_name, set_author_name] = useState();
  
  const publishedJobReport = async (currentPage) => {
    const response = await axios.get(
      `${baseURL}/report/get-Published-Job-Report?creation_start_date=${state.creationStartDate}&creation_end_date=${state.creationEndDate}&published_start_date=${state.pulbishedStartDate}&published_end_date${state.publishedEndDate}=&author_name=${state.authorName}&limit=${state.limit}&page=${currentPage}`,
      config
    );
    set_author_name(response?.data.Authors);
    setTotalCount(response?.data.Total_Pages);
    setApiResponse(response?.data.data);
    setAuthor(response?.data.Authors);
    setTotalData(response?.data.Total_Pages);
  };
  // console.log(totalData);

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const handleFilterSearch = (e) => {
    setState({ ...state, creationStartDate: e.target.vlaue });
  };
  const handleResetInput = (e) => {
    document.getElementById("reset-input").reset();
    // setState({ ...state, creationStartDate: " " });
    publishedJobReport();  // again call published api ;  
  };
  const handleCreationDateFilter = (e) => {
    setState({ ...state, creationStartDate: e.target.value });
    console.log("here creation date", state.creationEndDate);
  };
  const allFilterClear=()=>{
    console.log("input filed reset----");
    document.getElementById("reset-input").reset();
    publishedJobReport();
  }
  const handleNameFilter = (e) => {
    setState({ ...state, authorName: e.target.value });
    // setState({ ...state, authorName: "" });
    // console.log(state.authorName);
    // setNameOfAuthor(e.target.value);
    // publishedJobReport();  
  };

  useEffect(() => {
    console.log("state---",state);
    publishedJobReport(currentPage);
  }, [
    state.creationStartDate,
    state.creationEndDate,
    state.pulbishedStartDate,
    state.publishedEndDate,
    state.authorName,
    state.limit,
    currentPage,
    // pageCount,
  ]);
  return (
    <>
      <DashboardLayout>
        <section className="job_stagnation_sec rounded py-3">
          <div className="row">
            <div className="col-md-12">
              <div className="head px-3 d-md-flex d-block justify-content-between align-items-center">
                <h6 className="mb-2 mb-md-0">Published Job Report</h6>
              </div>
              <hr />
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
                    data-bs-target="#editModal"
                  >
                    Filter{" "}
                    <img
                      className="ms-2"
                      src="/images/icons/filter.svg"
                      alt="icon"
                    />
                  </button>
                </div>

                <div className="d-flex flex-wrap gap-3 mb-2 mb-md-0">
                  <button
                    className="btn_export "
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
                    className="btn_export "
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
            </div>

            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table text-center" ref={contentRef}>
                  <thead>
                    <tr>
                      <th scope="col">Job Name</th>
                      <th scope="col">URL</th>
                      <th scope="col">Author</th>
                      <th scope="col">Job Creation Date</th>
                      <th scope="col">Job Shared Date</th>
                      <th scope="col">Job Published Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiResponse?.length > 0 ? (
                      apiResponse
                        ?.filter((val) => {
                          if (
                            state.creationStartDate === "" &&
                            state.pulbishedStartDate === ""
                          ) {
                            return val;
                          } else if (
                            val?.jobCreationDate.includes(
                              state.creationStartDate
                            ) ||
                            val?.jobPublishedDate.includes(
                              state.pulbishedStartDate
                            )
                          ) {
                            return val;
                          }
                        })
                        .map((val, i) => {
                          return (
                            <tr key={i}>
                              <td
                                className="border-start-0"
                                style={{ width: "250px" }}
                              >
                                {val.blogTitle}
                              </td>
                              <td>{val.url}</td>
                              <td>{val.AuthorName}</td>
                              <td>{val.jobCreationDate}</td>
                              <td>null</td>
                              <td>{val.jobPublishedDate}</td>
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
                    marginPagesDisplayed={5}
                    pageRangeDisplayed={7}
                    pageCount={pageCount}
                    itemOffset={totalCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    onPageChange={handlePageChange}
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
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <form id="reset-input">
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
                <h5 className="modal-title mb-1" id="editModalLabel">
                  Job Creation Date
                </h5>
                <div className="row mb-3">
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <div className="form__box mb-3">
                      <label htmlFor="basic-url" className="form-label">
                        Start Date{" "}
                      </label>
                      <div className="input-group p-0">
                        <input
                          type="date"
                          className="form-control shadow-none"
                          // onChange={(e) =>
                          //   setState({
                          //     ...state,
                          //     creationStartDate: e.target.value,
                          //   })
                          // }
                          onChange={handleCreationDateFilter}
                        />
                      </div>
                    </div>
                    {/* Start Date*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <div className="form__box mb-3">
                      <label htmlFor="basic-url" className="form-label">
                        End Date{" "}
                      </label>
                      <div className="input-group p-0">
                        <input
                          type="date"
                          className="form-control shadow-none"
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
                <h5 className="modal-title mb-1" id="editModalLabel">
                  Job Published Date
                </h5>
                <div className="row mb-3">
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <div className="form__box mb-3">
                      <label htmlFor="basic-url" className="form-label">
                        Start Date{" "}
                      </label>
                      <div className="input-group p-0">
                        <input
                          type="date"
                          className="form-control shadow-none"
                          onChange={(e) =>
                            setState({
                              ...state,
                              pulbishedStartDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* Start Date*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <div className="form__box mb-3">
                      <label htmlFor="basic-url" className="form-label">
                        End Date{" "}
                      </label>
                      <div className="input-group p-0">
                        <input
                          type="date"
                          className="form-control shadow-none"
                          onChange={(e) =>
                            setState({
                              ...state,
                              publishedEndDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* End Date*/}
                  </div>
                </div>
                <h5 className="modal-title mb-1" id="editModalLabel">
                  Job shared date
                </h5>
                <div className="row mb-3">
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <div className="form__box mb-3">
                      <label htmlFor="basic-url" className="form-label">
                        Start Date{" "}
                      </label>
                      <div className="input-group p-0">
                        <input
                          type="date"
                          className="form-control shadow-none"
                        />
                      </div>
                    </div>
                    {/* Start Date*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <div className="form__box mb-3">
                      <label htmlFor="basic-url" className="form-label">
                        End Date{" "}
                      </label>
                      <div className="input-group p-0">
                        <input
                          type="date"
                          className="form-control shadow-none"
                        />
                      </div>
                    </div>
                    {/* End Date*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <div className="form__box mb-3">
                      <label htmlFor="basic-url" className="form-label">
                        Author Name
                      </label>
                      <select
                        className="form-select shadow-none"
                        aria-label="Default select example"
                        onChange={handleNameFilter}
                      >
                        <option>Select</option>
                        {author?.map((item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {/* Profile*/}
                  </div>

                  <div className="col-md-12">
                    <div className="d-flex gap-3 py-3">
                      <button
                        type="button"
                        className="btn_filter"
                        data-bs-dismiss="modal"
                        // onClick={publishedJobReport}
                        onClick={handleFilterSearch}
                      >
                        Filter
                        <img
                          src="/images/icons/filter.svg"
                          alt="filter-icon"
                          className="ms-2"
                        />
                      </button>
                      <button
                        type="button"
                        className="btn_reset"
                        // onClick={() => handleResetInput()}
                        onClick={()=>allFilterClear()}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>

                {/* Job shared date */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
