import React, { useState, useEffect } from 'react'

import Search from './components/Search'
import Pagination from './components/Pagination'
import DataTable from './components/DataTable'

function App() {
  const [ data, setData ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ query, setQuery ] = useState('')
  const [ ageSortDirection, setAgeSortDirection] = useState(null)

  const BASE_URL = 'http://localhost:3001'
  let dataCount 

  useEffect(() => {
    // const API_URL = `${BASE_URL}/students?_page=${page}`
    const API_URL = `${BASE_URL}/students?_page=${page}&q=${query}&_sort=${ageSortDirection && 'age'}&_order=${ageSortDirection}`
    const loadData = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('could not fetch data')

        dataCount = res.headers.get('X-Total-Count')
        const json = await res.json()
        console.log(json)
        setData(json)
      } catch (err) {
        console.log(err);
      } 
    }
    loadData()
  }, [page, query, ageSortDirection])

  // console.log(data);

	return (
		<div className='App'>
			<div className='container'>
        <Search query={query} setQuery={setQuery} />
        <Pagination 
          data={data}
          RenderComponent={DataTable}
          dataCount={dataCount}
          dataLimit={10}
          pageLimit={5}
          setPage={setPage}
          ageSortDirection={ageSortDirection}
          setAgeSortDirection={setAgeSortDirection}
        />
				{/* <DataTable data={data} /> */}
			</div>
		</div>
	)
}

export default App
