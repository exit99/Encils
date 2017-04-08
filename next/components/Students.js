import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  renderStudent(student) {
    return (
      <tr>
        <td>{ student.name }</td>
        <td>{ student.phone }</td>
        <td><span className="badge left" data-badge-caption="Present">{ student.attendance.preset || 0 }</span></td>
        <td><span className="badge left" data-badge-caption="Absent">{ student.attendance.absent || 0 }</span></td>
        <td><a style={ {cursor: "pointer" } } onClick={ () => Router.push(`/students/edit?pk=${student.pk}`) } className="tooltipped" data-position="bottom" data-delay="20" data-tooltip="Edit"><i className="material-icons">edit</i></a></td>
        <td><a style={ {cursor: "pointer" } } onClick={ () => this.props.onDelete(student) } className="tooltipped" data-position="bottom" data-delay="20" data-tooltip="Delete"><i className="material-icons">delete</i></a></td>
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
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { students.map(this.renderStudent.bind(this)) }
        </tbody>
      </table>
    );
  }
}
