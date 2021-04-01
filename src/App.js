import React, { useState, useEffect } from 'react'
import Pagination from './components/Pagination'
import DataTable from './components/DataTable'

function App() {
	const [ data, setData ] = useState([])

	useEffect(() => {
		const API_URL = 'http://localhost:3001/students'
		const loadData = async () => {
			try {
				const res = await fetch(API_URL)
				if (!res.ok) {
					throw new Error('could not fetch data')
				}
				const json = await res.json()
				setData(json)
			} catch (err) {
				console.log(err)
			}
		}
		loadData()
	}, [])

	return (
		<div className='App'>
			<div className='container'>
				{/* <DataTable data={data} /> */}
				<Pagination
					data={data}
					RenderComponent={DataTable}
					dataLimit={10}
					pageLimit={5}
				/>
			</div>
		</div>
	)
}

export default App
