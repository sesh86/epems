import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import { courses, emps } from './General';
import { getCookie } from './General';
import { connect } from 'react-redux'
import { mapDispatchEnquiry } from '../Reducer/action'

class EditEnquiry extends Component {
    constructor(props) {
        super(props);
        if (!getCookie('jwt')) this.props.history.push('/login');
        this.props.getEnq({ name: this.props.match.params.sid });
    }
   
    onSubmit = (ev) => {
        ev.preventDefault();
        let comm = {};

        for (let i in ev.target.elements) {
            if (ev.target.elements[i].value !== undefined && ev.target.elements[i].value !== '') {
                comm[ev.target.elements[i].name] = ev.target.elements[i].value;
            }
        }
        console.log(comm);
        axios.post('/updateEnqDetails',{_id:this.props.match.params.sid,body:comm})
        .then(res=>{
            this.props.history.push('/enquiry/'+this.props.match.params.sid)
        })    
    }

    render() {
        let data = this.props.state.enquiry, enq = data;
        console.log(data)
        return (
            <div className="container">
                <div>
                    <h3>Enquiry Details</h3>
                    <br />
                    <form onSubmit={this.onSubmit}>
                        <table className="table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr><th>Name*</th><td><input required className="form-control" name="name" type="text" defaultValue={data.name} /></td></tr>
                                <tr><th>Mobile*</th><td><input required className="form-control" name="mobile" type="number" defaultValue={data.mobile} /></td></tr>
                                <tr><th>Alternate Mobile</th><td><input className="form-control" name="alternatemobile" type="number" defaultValue={data.alternatemobile} /></td></tr>
                                <tr><th>Email</th><td><input className="form-control" name="email" type="email" defaultValue={data.email} /></td></tr>
                                <tr><th>Location</th><td><input className="form-control" name="location" type="text" defaultValue={data.location} /></td></tr>
                                <tr><th>Course*</th><td><select required name="course" className="form-control" defaultValue={data.course}><option></option>{courses.map((course, i) => (<option key={i}>{course}</option>))}</select></td></tr>
                                <tr><th>Assignedto*</th><td><select required name="assignedto" defaultValue={data.assignedto} className="form-control"><option></option>{emps.map((emp, i) => (<option key={i}>{emp}</option>))}</select></td></tr>
                            </tbody>
                        </table>
                        <button className="form-control btn btn-dark">Update</button>
                    </form>
                    <br />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => { return { state: state } }

export default connect(mapStateToProps, mapDispatchEnquiry)(EditEnquiry);