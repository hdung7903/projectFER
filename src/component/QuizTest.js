import React from 'react'
import {Button, Table} from 'react-bootstrap'
function QuizTest() {
  return (
    <>
    <h1>Test List</h1>
    <Table>
        <thead>
            <th>No</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Grade</th>
            <th>Action</th>
        </thead>
        <tbody>
            <td>1</td>
            <td>React Test</td>
            <th>120 mins</th>
            <th>8.0</th>
            <th>
                <Button>Do Test</Button>
                <Button>See Reslt</Button>
            </th>
        </tbody>
    </Table>
    </>
    
  )
}

export default QuizTest