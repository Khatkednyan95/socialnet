import React, { Component } from 'react';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteExperience} from '../../actions/profileAction'

 class Education extends Component {
     onDeleteClick(id)
     {
         this.props.deleteExperience(id)
     }
    render() {
        const experience=this.props.experience.map(exp=>(
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.From}</Moment>
                    </td>
                    <td>
                    {exp.to ===null ?("Now"):(
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )}
                     </td>
                    <td>
                        <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this,exp._id)}>Delete</button>
                    </td>
            </tr>
        ))
        return (
            <div>
                <h4  className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>

                            <th />
                        </tr>
                    </thead>
                    <tbody>{experience}</tbody>
                </table>
            </div>
        )
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        deleteExperience:(id)=>{dispatch(deleteExperience(id))}
    }
}

export default connect(null,mapDispatchToProps)(Education)
