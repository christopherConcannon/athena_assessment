import React from 'react'
import usePagination from '../hooks/usePagination'

const Pagination = ({
	data,
	RenderComponent,
	pageLimit,
	dataLimit,
	// setPage,
	ageSortDirection,
	setAgeSortDirection,
  apiConfig,
  setApiUrl
}) => {
	const {
		currentPage,
		goToPrevPage,
		goToNextPage,
		changePage,
		getPaginationGroup
	} = usePagination(pageLimit, apiConfig, setApiUrl)
	// } = usePagination(pageLimit, setPage, apiConfig, setApiUrl)

	const pages = Math.ceil(apiConfig?.dataCount / dataLimit)

	return (
		<React.Fragment>
			<RenderComponent
				data={data}
				ageSortDirection={ageSortDirection}
				setAgeSortDirection={setAgeSortDirection}
			/>
			<div className='pagination'>
				<button
					className={`prev ${currentPage === 1 && 'disabled'}`}
					onClick={goToPrevPage}
				>
					prev
				</button>
				{/* {[ ...Array(5) ].map((page, idx) => <button>{idx + 1}</button>)} */}
				{getPaginationGroup().map((page) => (
					<button
						className={`paginationItem ${currentPage === page && 'active'}`}
						key={page}
						onClick={changePage}
					>
						{page}
					</button>
				))}
				<button
					className={`next ${currentPage === pages && 'disabled'}`}
					onClick={goToNextPage}
				>
					next
				</button>
			</div>
		</React.Fragment>
	)
}

export default Pagination
