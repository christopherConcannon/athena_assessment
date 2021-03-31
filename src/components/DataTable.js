import React, { useState } from 'react'
import { average } from '../utils/helpers'

const DataTable = ({ data }) => {
	const [ sortedData, setSortedData ] = useState([ ...data ])
	const [ direction, setDirection ] = useState('asc')

  const rankedStudents = []

  // calculate student averages and add to objects.  push updated objects to array for ranking
  sortedData.map(person => {
    person.avg = average(Object.values(person.scores))
    rankedStudents.push(person)
  })

  // calculate rankings and add to student objects
  rankedStudents.sort((a, b) => {
    if (a.avg < b.avg) {
      return -1
    }
    if (a.avg > b.avg) {
      return 1
    }
    return 0
  }).reverse().forEach((student, idx) => {
    student.standing = idx + 1 
  })

  // sort based on rankings
	function handleSort() {
		let sorted = [...sortedData]
		if (direction === 'asc') {
			setDirection('desc')
			sorted = data.sort((a, b) => {
				if (a.standing < b.standing) {
					return -1
				}
				if (a.standing > b.standing) {
					return 1
				}
				return 0
			})
		} else {
			setDirection('asc')
			sorted = data.sort((a, b) => {
				if (a.standing < b.standing) {
					return 1
				}
				if (a.standing > b.standing) {
					return -1
				}
				return 0
			})
		}
		setSortedData(sorted)
	}

	return (
		<div className='container'>
			<table>
				<thead>
					<tr>
						<th>Student Name</th>
						<th>Age</th>
						<th>Test 1</th>
						<th>Test 2</th>
						<th>Test 3</th>
						<th>Avg</th>
						<th className='sorter' onClick={handleSort}>Standing <i className='fas fa-sort' /></th>
					</tr>
				</thead>
				<tbody>
					{sortedData.map((person, idx) => (
						<tr key={idx}>
							<td>{`${person.lastName}, ${person.firstName}`}</td>
							<td>{person.age}</td>
							<td>{person.scores.test1}</td>
							<td>{person.scores.test2}</td>
							<td>{person.scores.test3}</td>
							<td>{Math.round(person.avg)}</td>
							<td>{person.standing}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default DataTable
