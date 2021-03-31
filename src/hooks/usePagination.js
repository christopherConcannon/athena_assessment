import { useState } from 'react'

function usePagination(data, pageLimit, dataLimit) {
  // state variable to keep track of current page.  defaults to 1
	const [ currentPage, setCurrentPage ] = useState(1)

  // function to decrement current page
	const goToPreviousPage = () => {
		setCurrentPage((page) => page - 1)
	}

  // function to increment current page
	const goToNextPage = () => {
		setCurrentPage((page) => page + 1)
	}

  // function to change current page to the number value that corresponds to the page number displayed by the element...in this case a button
	const changePage = (event) => {
		const pageNumber = Number(event.target.textContent)
		setCurrentPage(pageNumber)
	}

  // function to get the sub-array of posts to display on the current page
	const getPaginatedData = () => {
		// return dataLimit number of posts
		// currentPage 1 shows posts 0-9, so we want to start currentPage 2 at 10. if currentPage is 2...2 * 10 = 20, 20 - 10 is 10.
		const startIndex = currentPage * dataLimit - dataLimit
		const endIndex = startIndex + dataLimit
    // return elements from start index through endIndex (non-inclusive)
		return data.slice(startIndex, endIndex)
	}

	// function to show the group of page numbers in the pagination.  with a pageLimit of 5, we show 5 page numbers at a time
	const getPaginationGroup = () => {
		// calculate starting point that will be used to show the subsequent page numbers.  if start is 0, return array [1, 2, 3, 4, 5].  if start is 5, return [6, 7, 8, 9, 10]
    // start will be 0 for currentPage value 1-5, then it will be 5 for values 6-10
		let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    // return a new array of pageLimit length filled with the values between (start + 1) and start + pageLimit.
		return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
	}

	return {
		currentPage,
		goToPreviousPage,
		goToNextPage,
		changePage,
		getPaginatedData,
		getPaginationGroup
	}
}

export default usePagination
