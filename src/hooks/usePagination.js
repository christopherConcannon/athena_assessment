import { useState } from 'react'

const usePagination = (pageLimit, setPage) => {
	const [ currentPage, setCurrentPage ] = useState(1)

	const goToPrevPage = () => {
			setCurrentPage((prev) => prev - 1)
			setPage((prev) => prev - 1)
	}
	const goToNextPage = () => {
			setCurrentPage((prev) => prev + 1)
			setPage((prev) => prev + 1)
	}
	const changePage = (e) => {
    setCurrentPage(+e.target.innerText)
    setPage(+e.target.innerText)
  }

	const getPaginationGroup = () => {
		const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
		return [ ...new Array(5) ].map((_, idx) => idx + start + 1)
	}

	return {
    currentPage,
		goToPrevPage,
		goToNextPage,
		changePage,
		getPaginationGroup
	}
}

export default usePagination
