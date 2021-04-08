import { useState } from 'react'

// const usePagination = (pageLimit, setPage, pageConfig, setApiUrl) => {
const usePagination = (pageLimit, pageConfig, setApiUrl) => {
	const [ currentPage, setCurrentPage ] = useState(1)

	const goToPrevPage = () => {
			setCurrentPage((prev) => prev - 1)
			// setPage((prev) => prev - 1)
      setApiUrl(pageConfig.prev)
	}
	const goToNextPage = () => {
			setCurrentPage((prev) => prev + 1)
			// setPage((prev) => prev + 1)
      setApiUrl(pageConfig.next)
	}
	const changePage = (e) => {
    setCurrentPage(+e.target.innerText)
    // setPage(+e.target.innerText)
    setApiUrl(`http://localhost:3001/students?_page=${+e.target.innerText}&q=&_sort=null&_order=null`)
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
