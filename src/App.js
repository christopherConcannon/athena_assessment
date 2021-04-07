import React from 'react'
import data from './data'

import DataTable from './components/DataTable'

function App() {

	return (
		<div className='App'>
			<div className='container'>
				<DataTable data={data} />
			</div>
		</div>
	)
}

export default App
