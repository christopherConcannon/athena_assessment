import React, { useState } from 'react'

const Pagination = ({ data, RenderComponent, dataLimit, pageLimit }) => {
	const [ currentPage, setCurrentPage ] = useState(1)

	const pages = Math.ceil(data.length / dataLimit)

	// decrement currentPage
	const prevPage = () => {
		setCurrentPage((prev) => prev - 1)
	}
	// increment currentPage
	const nextPage = () => {
		setCurrentPage((prev) => prev + 1)
	}
	// change currentPage
	const changePage = (e) => {
		setCurrentPage(+e.target.innerText)
	}
	// return sub array of results
	const getPages = () => {
		const startIdx = currentPage * dataLimit - dataLimit
		const lastIdx = startIdx + dataLimit
		return data.slice(startIdx, lastIdx)
	}

	const getPaginationGroup = () => {
		const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1
		// return new Array(pageLimit).fill().map((_, idx) => start + idx)
		return [...new Array(pageLimit)].map((_, idx) => start + idx)
  }
	return (
		<div>
			<RenderComponent data={data} getPages={getPages} />

			<div className='pagination'>
				<button className={`prev ${currentPage === 1 && 'disabled'}`} onClick={prevPage}>
					prev
				</button>
				{/* {[...Array(pages)].map((_, idx) => ( 
          <button
            key={idx}
            onClick={changePage}
            className={`pagination-item ${currentPage === idx + 1 && 'active'}`}
          >
            {idx + 1}
          </button>
        ))} */}
				{getPaginationGroup().map((page) => (
					<button
						key={page}
						onClick={changePage}
						className={`pagination-item ${currentPage === page && 'active'}`}
					>
						{page}
					</button>
				))}
				<button
					className={`next ${currentPage === pages && 'disabled'}`}
					onClick={nextPage}
				>
					next
				</button>
			</div>
		</div>
	)
}

export default Pagination
