import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { handleExportExcel } from "../../common/ExcelFunction";
import { handleExportPDF } from "../../common/ConvertPDF";

export default function JobStagnation() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const token = useSelector(selectCurrentToken);
  const contentRef = useRef(null);
  const [apiResponse, setApiResponse] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount] = useState(2);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let limit = 5;
  const initialValues = {
    member: "",
    profile: "",
    creationStartDate: "",
    creationEndDate: "",
  };
  const [state, setState] = useState(initialValues);
  const stagnationReport = async (page) => {
    const response = await axios.get(
      `${baseURL}/report/get-job-stagnation-report?member=${state.member}&profile=${state.profile}&creation_start_date=${state.creationStartDate}&creation_end_date=${state.creationEndDate}&page=${page}&limit=${limit}`,
      config
    );
    setTotalCount(response?.data.Total_Pages);
    setApiResponse(response?.data?.data);
    setMemberList(response?.data.MemberList);
    setProfileList(response?.data.ProfileList);
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  const handleCreationStart = (e) => {
    setState({ ...state, creationStartDate: e.target.value });
  };
  const handleCreationEnd = (e) => {
    setState({ ...state, creationEndDate: e.target.value });
  };
  const handleResetInput = () => {
    document.getElementById("reset-input").reset();
  };
  useEffect(() => {
    stagnationReport(currentPage);
  }, [limit, currentPage]);
  return (
    <>
      <DashboardLayout>
        <section className="job_stagnation_sec rounded py-3">
          <div className="row">
            <div className="col-md-12">
              <div className="head px-3 d-md-flex d-block justify-content-between align-items-center">
                <h6 className="mb-2 mb-md-0">Job Stagnation Report</h6>
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
                    // onClick={handleExportExcel}
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
                    // onClick={handleExportPDF}
                    onClick={()=> handleExportPDF(contentRef)}
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
                      <th scope="col">Stage</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiResponse?.length > 0 ? (
                      apiResponse?.map((val, i) => {
                        return (
                          <tr key={i}>
                            <td
                              className="border-start-0"
                              style={{ width: "250px" }}
                            >
                              {val.blogTitle}
                            </td>
                            <td>{val.stage}</td>
                            <td>{val.assignTo}</td>
                            <td>{val.duration}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr> No Record is Found</tr>
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
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    itemOffset={30}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName={"pagination"}
                    onPageChange={handlePageClick}
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
        <form id="reset-input"></form>
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
                    <label for="basic-url" className="form-label">
                      Start Date{" "}
                    </label>
                    <div className="input-group p-0">
                      <input
                        type="date"
                        className="form-control shadow-none"
                        onChange={handleCreationStart}
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
                        onChange={handleCreationEnd}
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
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      Profile
                    </label>
                    <select
                      className="form-select shadow-none"
                      aria-label="Default select example"
                    >
                      <option>Select</option>
                      {profileList?.map((items) => {
                        return (
                          <option value={items} key={items}>
                            {items}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Profile*/}
                </div>
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form__box mb-3">
                    <label for="basic-url" className="form-label">
                      Member
                    </label>
                    <select
                      className="form-select shadow-none"
                      aria-label="Default select example"
                    >
                      <option>Select</option>
                      {memberList?.map((item) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Member*/}
                </div>

                <div className="col-md-12">
                  <div className="d-flex gap-3 py-3">
                    <button
                      type="button"
                      className="btn_filter"
                      data-bs-dismiss="modal"
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
                      onClick={handleResetInput}
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
      </div>
    </>
  );
}
