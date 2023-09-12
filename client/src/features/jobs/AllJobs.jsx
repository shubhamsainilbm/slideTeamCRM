import React, { useEffect, useState } from "react";
import { selectAllJobs, useGetJobQuery } from "./jobsApiSlice";
import Jobs from "./Jobs";
import useAuth from "../../hooks/useAuth";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
const AllJobs = () => {
  const { userId, isAdmin, isSubAdmin, isJobAllocator, userEmail } = useAuth();
  let limit = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  let pageNumber = ``;
  const jobCount = useSelector((state) => selectAllJobs(state)).length;
  const { data: jobs, isLoading, isSuccess, isError, error } = useGetJobQuery();
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
    setPageCount(Math.ceil(jobCount / limit));
  }, []);
  if (isSuccess) {
    const { ids, entities } = jobs;
    console.log("first", jobs);
    let filterIds;
    if (isAdmin || isJobAllocator) {
      filterIds = [...ids];
      console.log("filterIds", jobs);
    } else {
      filterIds = ids.filter(
        (jobId) =>
          entities[jobId]?.createdBy?._id === userId ||
          entities[jobId]?.assignJob?.author === userEmail ||
          (entities[jobId]?.assignJob?.evaluator?.evaluatedBy === userEmail &&
            !entities[jobId]?.assignJob?.evaluator?.blogDoc === false &&
            !entities[jobId]?.assignJob?.evaluator?.gScreenShoot === false)
      );
    }

    const tableData = ids?.length ? (
      filterIds.map((jobId) => <Jobs key={jobId} jobId={jobId} />)
    ) : (
      <p className="mt-3 ">No Result Found</p>
    );
    content = (
      <table className="table text-center">
        <thead>
          <tr>
            {/* <th scope="col">
              <div className="form-check ms-2">
                <input
                  className="form-check-input shadow-none"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            </th> */}
            <th scope="col">code</th>
            <th scope="col">Name</th>
            <th scope="col">Pending On Desk</th>
            <th scope="col">Status</th>
            <th scope="col">Start Date</th>
            <th scope="col">Date of Publishing</th>
            <th scope="col">Name of Author</th>
            <th scope="col">Priority</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
  }

  const handlePageClick = (event) => {
    const countNumber = event.selected + 1;
    setCurrentPage(countNumber);
  };
  return (
    <>
      <div className="table-responsive">{content}</div>
      <div className="table_pagination my-4 d-md-flex d-block justify-content-between px-3">
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
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            onPageChange={handlePageClick}
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
    </>
  );
};

export default AllJobs;
