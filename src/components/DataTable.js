import React from 'react'
import { average } from '../utils/helpers'

const DataTable = ({ data }) => {

  const rankedStudents = []
  
  data.forEach(student => {
    student.avg = average(Object.values(student.scores))
    rankedStudents.push(student)
  })

  console.log(rankedStudents)

  rankedStudents.sort((a, b) => {
    // descending sort
    if (a.avg > b.avg) return -1
    if (a.avg < b.avg) return 1
    return 0
  }).forEach((student, idx) => student.standing = idx + 1)

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
						<th>Standing</th>
					</tr>
				</thead>
				<tbody>
					{data.map((student, idx) => (
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
