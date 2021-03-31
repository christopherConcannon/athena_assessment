import React, { useState, useEffect } from 'react'

import Search from './components/Search'
import Pagination from './components/Pagination'
import DataTable from './components/DataTable'


function App() {
	const [ data, setData ] = useState([])
	const [ loading, setLoading ] = useState(true)
	const [ error, setError ] = useState(false)
	const [ query, setQuery ] = useState('')

	useEffect(() => {
		const API_URL = 'http://localhost:3001/students'
		const loadData = async () => {
			try {
				const res = await fetch(API_URL)
				if (!res.ok) {
					throw new Error('Could not fetch your data')
				}
				const json = await res.json()
				setData(json)
				setLoading(false)
			} catch (err) {
				setError(true)
				setLoading(false)
				console.log(err)
			}
		}
		loadData()
	}, [])

	const searchNames = (rows) => {
		// return rows where value of field includes search string
			return rows.filter((row) => {
				return (
          row.lastName.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
          row.firstName.toLowerCase().indexOf(query.toLowerCase()) > -1 
        
        )
			})
	}

	if (loading) {
		return <h2>Loading...</h2>
	}

	return (
		<div className='App'>
			<div className='container'>
				<Search query={query} setQuery={setQuery}/>
        <Pagination 
            data={searchNames(data)}
            RenderComponent={DataTable}
            // how many page links to show in the pagination group
            pageLimit={5}
            // how many posts per page
            dataLimit={5}
          />
				{/* <DataTable data={searchNames(data)} /> */}
				{error && (
					<div className='error'>Sorry, there was a problem loading your data</div>
				)}
			</div>
		</div>
	)
}

export default App
