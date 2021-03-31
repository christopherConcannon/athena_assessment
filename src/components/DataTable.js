import React, { useState } from 'react'
import { average } from '../utils/helpers'

const DataTable = ({ data }) => {
	const [ sortDirection, setSortDirection ] = useState(null)


  const rankedStudents = []

  data.map(person => {
    person.avg = average(Object.values(person.scores))
    rankedStudents.push(person)
  })

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

  if (sortDirection !== null) {
    data.sort((a, b) => {
      if (a.standing < b.standing) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (a.standing > b.standing) {
        return sortDirection === 'asc' ?  1 : -1
      }
    })
  }

	function handleSort() {
    let direction = 'asc'
    if (sortDirection === 'asc') {
      direction = 'desc'
    }
    setSortDirection(direction)
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
					{data.map((person, idx) => (
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
