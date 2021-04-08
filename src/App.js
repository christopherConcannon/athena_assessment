import React, { useState, useEffect } from 'react'
import useDebounced from './hooks/useDebounced'

import Search from './components/Search'
import Pagination from './components/Pagination'
import DataTable from './components/DataTable'

function App() {
  const [ data, setData ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ query, setQuery ] = useState('')
  const [ ageSortDirection, setAgeSortDirection] = useState(null)
  const [ dataCount, setDataCount] = useState(null)
  const debounced = useDebounced(query)

  const BASE_URL = 'http://localhost:3001'
  

  useEffect(() => {
    // const API_URL = `${BASE_URL}/students?_page=${page}`
    // const API_URL = `${BASE_URL}/students?_page=${page}&q=${query}&_sort=${ageSortDirection && 'age'}&_order=${ageSortDirection}`
    const API_URL = `${BASE_URL}/students?_page=${page}&q=${debounced}&_sort=${ageSortDirection && 'age'}&_order=${ageSortDirection}`
    const loadData = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('could not fetch data')

        setDataCount(+res.headers.get('X-Total-Count'))
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.log(err);
      } 
    }
    loadData()
  // }, [page, query, ageSortDirection])
  }, [page, debounced, ageSortDirection])

  // console.log(data);

	return (
		<div className='App'>
			<div className='container'>
        <Search query={query} setQuery={setQuery} />
        <Pagination 
          data={data}
          RenderComponent={DataTable}
          dataCount={dataCount}
          // dataCount={100}
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
