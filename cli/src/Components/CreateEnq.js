import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {getHTMLDate,getCookie,courses} from './General';
import Alert from 'react-bootstrap/Alert'
class CreateEnq extends Component { 
  constructor(props) {
    super(props);
    if(!getCookie('jwt')) this.props.history.push('/login');
  }  
  emps=['Ramya','Ram','Divya','Sivaranjani','Bharath','JP','Balaji'];
  sources = ['Walkin', 'Google', 'Sulekha', 'UrbanPro', 'Direct Call', 'Direct Email', 'Reference']
  status = ['Open', 'Closed','Visited','Demo Attended','In-Progress','Joined']
  state={error:''}
  onSubmit=(ev)=>{
    ev.preventDefault();
    let login={};
    
    for(let i in ev.target.elements){
        if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!==''){
          login[ev.target.elements[i].name]=ev.target.elements[i].value;
        }
    }

    let comments=[],comment;
    if(login.comment!==undefined && login.comment!=='')
        comment=login.comment;

    login['comments']=[{comment:comment,date:new Date()}];

    console.log(login);
    // return;    
    axios.post('/createEnq',login)
    .then(res=>{
        this.props.history.push('/')
    });
  }

  render() {
    return (
      <div className="container cat">
        <br/>
        <br/>
        <h1>New Enquiry</h1>
{/* 
        var enqs = mongoose.model('enqs', {name: String, mobile:String, email:String,course:String,source:String,location:String,assignedto:String,status:String,dueDate:Date,enquiries:JSON});         */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          Name*<input type="text" name="name" required className="form-control"/>
          Mobile*<input type="number" name="mobile" required className="form-control"/>
          Alternate Mobile<input type="number" name="alternatemobile" className="form-control"/>
          Email<input type="email" name="email" className="form-control"/>
          Course*<select required name="course" className="form-control"><option></option>{courses.map((course,i) => (<option key={i}>{course}</option>))}</select>
          Location<input type="text" name="location" className="form-control"/>
          Source*<select required name="source" className="form-control"><option></option>{this.sources.map((s,i) => (<option key={i}>{s}</option>))}</select>
          Assigned To*
          <select required name="assignedto" className="form-control"><option></option>{this.emps.map((emp,i) => (<option key={i}>{emp}</option>))}</select>
          Status*
          <select required name="status" className="form-control"><option></option>{this.status.map((s,i) => (<option key={i}>{s}</option>))}</select>
          <br/> 
          Followup Date*<input type="date" required name="dueDate" className="form-control"/>                    
          <br/>
          Additional Comments
          <input type="text" name="comment" className="form-control"/>
          <br/>
          {this.state.error!==''?<div><Alert variant="danger">{this.state.error}</Alert><br/></div>:null}          
          <button className="form-control btn btn-dark">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps)(CreateEnq);
