import React, { useState } from 'react'

const DataTable = ({ data }) => {
  const [ sortedData, setSortedData ] = useState([...data])
	// const sortedData = [ ...data ]

	function handleSort() {
		data.sort((a, b) => {
			if (a.scores.test1 < b.scores.test1) {
				return -1
			}
			if (a.scores.test1 > b.scores.test1) {
				return 1
			}
			return 0
		})
	}

	function avg(scores) {
		return Math.round(Object.values(scores).reduce((acc, cur) => acc + cur, 0) / 3)
	}

  // get an array of averages to map to each person
	// const avgArr = data.map(person => {
	//   return avg(person.scores)
	// })
	// console.log(avgArr);

	return (
		<div className='container'>
			<table>
				<thead>
					<tr>
						<th>Student Name</th>
						<th>Age</th>
						<th onClick={handleSort}>Test 1</th>
						{/* <th>Test 1</th> */}
						<th>Test 2</th>
						<th>Test 3</th>
						<th>Avg</th>
						<th>Standing</th>
					</tr>
				</thead>
				<tbody>
					{/* {data.map((item) => ( */}
					{sortedData.map((item, idx) => (
						<tr key={idx}>
							<td>{`${item.lastName}, ${item.firstName}`}</td>
							<td>{item.age}</td>
							<td>{item.scores.test1}</td>
							<td>{item.scores.test2}</td>
							<td>{item.scores.test3}</td>
							<td>{avg(item.scores)}</td>
							<td />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default DataTable
