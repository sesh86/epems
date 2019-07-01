import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {getHTMLDate} from './General';
import Alert from 'react-bootstrap/Alert'
class CreateExpense extends Component {
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

    let payment=[{payment:login.paid,mode:login.mode,date:login.date,comment:login.comment}];
    login['payment']=payment;
    console.log(login.paid)
    console.log(login.fee)
    if(login.paid===login.payable){
      login['status']='Complete';
    }
    else{
      if(login.dueDate===undefined){this.setState({error:'Due Date is required if the payment is not made in full'});return;}
      login['status']='Pending';
    }
    delete login.mode;
    delete login.date;
    axios.post('/createExpense',login)
    .then(res=>{
        this.props.history.push('/')
    });
  }

  render() {
    return (
      <div className="container cat">
        <br/>
        <br/>
        <h1>New Expense</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          Name*<input type="text" name="name" required className="form-control"/>
          Mobile*<input type="number" name="mobile" required className="form-control"/>
          Email*<input type="email" name="email" required className="form-control"/>
          PaidFor*<input type="text" name="paidfor" required className="form-control"/>
          Payable*<input type="number" name="payable" required className="form-control"/>
          <br/> 
          
          <b>Initial Payment</b>
          <br/>
          Amount Paid*<input type="number" name="paid" required className="form-control"/>
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

export default connect(mapStateToProps)(CreateExpense);
