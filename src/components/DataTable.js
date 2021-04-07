import React, { useState } from 'react'
import { average } from '../utils/helpers'

const DataTable = ({ data }) => {
	const [ sortDirection, setSortDirection ] = useState(null)


  const students = [...data]

	students
		.map((student) => {
			student.avg = average(Object.values(student.scores))
			return student
		})
		.sort((a, b) => b.avg - a.avg)
		.forEach((student, idx) => (student.standing = idx + 1))

	if (sortDirection !== null) {
		students.sort((a, b) => {
			if (a.standing < b.standing) {
        return sortDirection === 'ascending' ? -1 : 1
      }
			if (a.standing > b.standing) {
        return sortDirection === 'ascending' ? 1 : -1
      }
			return 0
		})
	}

	const handleSort = () => {
    let direction = 'ascending'
    if (sortDirection === 'ascending') direction = 'descending'
    setSortDirection(direction)
	}

	return (
		<div className='DataTable'>
			<table>
				<thead>
					<tr>
						<th>Student Name</th>
						<th>Age</th>
						<th>Test 1</th>
						<th>Test 2</th>
						<th>Test 3</th>
						<th>Avg</th>
						<th onClick={handleSort}>
							Standing <i className='fas fa-sort' />
						</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student, idx) => (
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
		</div>
	)
}

export default DataTable
