import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {getHTMLDate} from './General';
import Alert from 'react-bootstrap/Alert'
class CreatePayment extends Component {
  batches = ['Weekday', 'Weekends']
  modes = ['Cash', 'Card','Paytm','Online']
  state={error:''}
  onSubmit=(ev)=>{
    ev.preventDefault();
    let login={};
    
    for(let i in ev.target.elements){
        if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!==''){
          login[ev.target.elements[i].name]=ev.target.elements[i].value;
        }
    }
    console.log(login)

    let payment=[{payment:login.received,mode:login.mode,date:login.date,comment:login.comment}];
    login['payment']=payment;
    console.log(login.received)
    console.log(login.fee)
    if(login.received===login.fee){
      login['status']='Complete';
    }
    else{
      if(login.dueDate===undefined){this.setState({error:'Due Date is required if the payment is not made in full'});return;}
      login['status']='Pending';
    }
    // return;
    delete login.mode;
    delete login.date;
    axios.post('/createPayment',login)
    .then(res=>{
        this.props.history.push('/')
        console.log(res);
    });
  }

  render() {
    return (
      <div className="container cat">
        <br/>
        <br/>
        <h1>New Student</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          Name*<input type="text" name="student" required className="form-control"/>
          Mobile*<input type="number" name="mobile" required className="form-control"/>
          Email*<input type="email" name="email" required className="form-control"/>
          Course*<input type="text" name="course" required className="form-control"/>
          Fee*<input type="number" name="fee" required className="form-control"/>
          <br/> 
          
          <b>Initial Payment</b>
          <br/>
          Amount Received*<input type="number" name="received" required className="form-control"/>
          Payment Date*<input type="date" data-date-format="DD MMMM YYYY" name="date" required className="form-control" defaultValue={getHTMLDate(new Date())}/>
          Payment Mode*
          <select required name="mode" className="form-control">
              <option></option>
              {
                this.modes.map((status,i) => (
                    <option key={i}>{status}</option>
                ))
              }
          </select>          
          Weekday/Weekend Batch*
          <select required className="form-control" name="batch">
              <option></option>
              {
                this.batches.map((status,i) => (
                    <option key={i}>{status}</option>
                ))
              }
          </select>          
          <br/>
          <b>Followup</b>
          <br/>
          Due Date<input type="date" name="dueDate" className="form-control"/>                    
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

export default connect(mapStateToProps)(CreatePayment);
