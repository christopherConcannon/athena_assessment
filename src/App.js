import React, { useState, useEffect } from 'react'
import parse from 'parse-link-header'

import Search from './components/Search'
import Pagination from './components/Pagination'
import DataTable from './components/DataTable'

const BASE_URL = 'http://localhost:3001'

function App() {
	const [ data, setData ] = useState([])
	const [ page, setPage ] = useState(1)
	const [ query, setQuery ] = useState('')
	const [ ageSortDirection, setAgeSortDirection ] = useState(null)
	const [ apiConfig, setApiConfig ] = useState(null)
  const [ apiUrl, setApiUrl ] = useState(`${BASE_URL}/students?_page=${page}&q=${query}&_sort=${ageSortDirection &&
    'age'}&_order=${ageSortDirection}`)
  

	useEffect(
		() => {
			// const API_URL = `${BASE_URL}/students?_page=${page}`
			// const API_URL = `${BASE_URL}/students?_page=${page}&q=${query}&_sort=${ageSortDirection &&
			// 	'age'}&_order=${ageSortDirection}`
			const loadData = async () => {
				try {
					// const res = await fetch(API_URL)
					const res = await fetch(apiUrl)
					if (!res.ok) throw new Error('could not fetch data')
					// console.log('headers', res.headers.get('Link'))

					let links = res.headers.get('Link')
					links = parse(links)
          // console.log('links', links);
					const dataCount = res.headers.get('X-Total-Count')

					setApiConfig({
						dataCount: dataCount,
						prev: links.prev?.url,
						next: links.next?.url
					})

					const json = await res.json()
					// console.log(json)
					setData(json)
				} catch (err) {
					console.log(err)
				}
			}
			loadData()
		},
		// [ page, query, ageSortDirection ]
		[ apiUrl, query, ageSortDirection ]
	)

	// console.log(data);

	return (
		<div className='App'>
			<div className='container'>
				<Search query={query} setQuery={setQuery} />
				<Pagination
					data={data}
					RenderComponent={DataTable}
					dataLimit={10}
					pageLimit={5}
					// setPage={setPage}
					ageSortDirection={ageSortDirection}
					setAgeSortDirection={setAgeSortDirection}
          apiConfig={apiConfig}
          setApiUrl={setApiUrl}
				/>
				{/* <DataTable data={data} /> */}
			</div>
		</div>
	)
}

export default App
