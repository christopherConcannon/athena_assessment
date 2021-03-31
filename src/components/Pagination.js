import React, { useState, useEffect } from 'react'
import usePagination from '../hooks/usePagination'

function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
  // we use this to determine the styling of the 'next' button
	const [ pages ] = useState(Math.round(data.length / dataLimit))

  const { currentPage, goToPreviousPage, goToNextPage, changePage, getPaginatedData, getPaginationGroup } = usePagination(data, pageLimit, dataLimit)



  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' })
  }, [currentPage])

	return (
    <>

      {/* show the posts, 10 posts at a time */}
      <div className="dataContainer">
        {/* {getPaginatedData().map((data, idx) => (
          <RenderComponent key={idx} data={data} />
        ))} */}
        <RenderComponent data={data} getPaginatedData={getPaginatedData} />
      </div>

      {/* show the pagination.  it consists of next and previous buttons along with page numbers, in our case, 5 page numbers at a time */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={() => goToPreviousPage()}
          // if we're on the first page, we don't want button to be clickable
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>
        {/* show page numbers */}
        {getPaginationGroup().map((item, idx) => (
          <button
            key={idx}
            onClick={(e) => changePage(e)}
            // if item in current iteration is equal to the current page, we want it to have the active style
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            {item}
          </button>
        ))}

        {/* next button */}
        <button
          onClick={() => goToNextPage()}
          // if we are on the last page, give button disabled styling
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>
    </>
  )
}

export default Pagination
