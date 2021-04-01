import React, { useState } from 'react'
import { average } from '../utils/helpers'

const DataTable = ({ data, getPages }) => {
	const [ sortDirection, setSortDirection ] = useState(null)

  const rankedStudents = []

  // calculate test averages and add to data objects
  data.forEach(student => {
    student.avg = average(Object.values(student.scores))
    rankedStudents.push(student)
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

  // if sort button is clicked sort based on rankings and sort direction
  if (sortDirection !== null) {
    data.sort((a, b) => {
      if (a.standing < b.standing) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (a.standing > b.standing) {
        return sortDirection === 'asc' ?  1 : -1
      }
      return 0
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
		<>
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
					{/* {data.map((student, idx) => ( */}
					{getPages().map((student, idx) => (
						<tr key={idx}>
							<td>{`${student.lastName}, ${student.firstName}`}</td>
							<td>{student.age}</td>
							<td>{student.scores.test1}</td>
							<td>{student.scores.test2}</td>
							<td>{student.scores.test3}</td>
							<td>{Math.round(student.avg)}</td>
							<td>{student.standing}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default DataTable
