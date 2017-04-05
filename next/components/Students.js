import React from 'react'

export default class extends React.Component {
  renderStudent(student) {
    return (
      <tr>
        <td>{ student.name }</td>
        <td>{ student.phone }</td>
        <td>{ student.grade }%</td>
        <td><span className="badge left" data-badge-caption="Present">10</span></td>
        <td><span className="badge left" data-badge-caption="Absent">0</span></td>
        <td><span className="badge left" data-badge-caption="Late">0</span></td>
        <td><a className="tooltipped" data-position="bottom" data-delay="20" data-tooltip="Edit"><i className="material-icons">edit</i></a></td>
        <td><a href="#deleteModal" className="tooltipped" data-position="bottom" data-delay="20" data-tooltip="Delete"><i className="material-icons">delete</i></a></td>
      </tr>
    )
  }

  render() {
    const { students } = this.props;

    if (students.length == 0) { return <p>No students enrolled</p>; }

    return (
      <table className="bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Grade</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { students.map(renderStudent.bind(this)) }
        </tbody>
      </table>
    );
  }
}
