import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export const paginationFunction = () => {
  const [pageCount, setPapgeCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(()=>{
    console.log(currentPage, pageCount);
  },[currentPage])
  return (
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
  );
};
export default {currentPage};
