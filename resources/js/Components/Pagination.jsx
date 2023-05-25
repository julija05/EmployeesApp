import { useEffect, useState } from "react";

function Pagination(props) {
  const handlePageChange = (page) => {
    if (props.setPage) {
      props.setPage(page)
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [ <span onClick={()=> handlePageChange(1)} className="  cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    1
  </span>];

    for (let i = (props.currentPage - 3) > 0 ? props.currentPage - 3 : props.currentPage; i <= props.totalPages; i++) {

      if (i==1) {
        continue
      }

      if (i === props.currentPage) {
        pageNumbers.push(
          <span key={i}  className=" cursor-pointer z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
            <strong>{i}</strong>
          </span>
        );
        continue
      }

      pageNumbers.push(
        <span key={i} onClick={()=> handlePageChange(i)} className=" cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {i}
        </span>
      );
      if (pageNumbers.length > 6) {
        break
      }
    }

    if (props.currentPage + 2 < props.totalPages) {
      pageNumbers.push(<span className="m-4"></span>);
    }

    return pageNumbers;
  };

  return (
    <div>
      {/* Render pagination controls */}
      <div className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        {props.currentPage > 1 && (
          <span className=" cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white m-4" onClick={() => handlePageChange(props.currentPage - 1)}>Prev</span>
        )}
        {renderPageNumbers()}
        {props.currentPage < props.totalPages && (
          <span className=" cursor-pointer px-3 mr-8 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handlePageChange(props.currentPage + 1)}>Next</span>
        )}
        <span className="ml-4 font-bold">Last Page: </span> <span className="ml-4 cursor-pointer" onClick={()=> handlePageChange(props.totalPages)}>{props.totalPages}</span>
      </div>
    </div>
  );
}

export default Pagination;