import React, { Component } from 'react';
import Moment  from 'react-moment'
import {connect} from 'react-redux';
import {deleteEducation} from '../../actions/profileAction'

 class Education extends Component {
     onDeleteClick(id)
     {
         this.props.deleteEducation(id)
     }
    render() {
        const education=this.props.education.map(edu=>(
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.From}</Moment>
                    </td>
                    <td>

                    
                    {edu.to ===null ?("Now"):(
                        <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    )}
                      </td>
                    <td>
                        <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this,edu._id)}>Delete</button>
                    </td>
            </tr>
        ))
        return (
            <div>
                <h4  className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>

                            <th />
                        </tr>
                    </thead>
                    <tbody>{education}</tbody>
                </table>
            </div>
        )
    }
}


const mapDispatchToProps=dispatch=>{
    return {
        deleteEducation:(id)=>{dispatch(deleteEducation(id))}
    }
}
export default connect(null,mapDispatchToProps)(Education)
