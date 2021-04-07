import React, { useState, useEffect } from 'react'

import DataTable from './components/DataTable'


function App() {
	const [ data, setData ] = useState([])
	const [ loading, setLoading ] = useState(true)
	const [ error, setError ] = useState(false)

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


	if (loading) {
		return <h2>Loading...</h2>
	}

	return (
		<div className='App'>
			<div className='container'>

				<DataTable data={data} />
				{error && (
					<div className='error'>Sorry, there was a problem loading your data</div>
				)}
			</div>
		</div>
	)
}

export default App
