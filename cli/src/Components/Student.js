// status change in student page - done
// create payment - status select - done
// weekend/weekday batch  - done
// search numbers - partial - done
//change only due date
import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import Alert from 'react-bootstrap/Alert'
import {getHTMLDate} from './General';
import load from '../load.gif';
import { formatDate,getCookie } from './General';
import { connect } from 'react-redux'
import { mapDispatchStudent } from '../Reducer/action'

class Student extends Component {
  constructor(props) {
    super(props);
    if(!getCookie('jwt')) this.props.history.push('/login');
    this.props.getStudent({name: this.props.match.params.sid });
    this.state={error:'',status:'',updFlag:false}
  }
  componentDidMount() { }
  onSubmit = (ev) => {
    ev.preventDefault();
    let enquiry = {};

    for (let i in ev.target.elements) {
      if (ev.target.elements[i].value !== undefined && ev.target.elements[i].value !== '') {
        enquiry[ev.target.elements[i].name] = ev.target.elements[i].value;
      }
    }
    let body={}
    if(enquiry.dueDate===undefined){
      if(enquiry.payment===undefined){this.setState({error:'Please enter an amount'});return;}
      else if(enquiry.mode===undefined){this.setState({error:'Please select a mode of payment'});return;}
      else if(enquiry.date===undefined){this.setState({error:'Please select a date'});return;}
      let payments=[];;
      if(this.props.state.student.payment){payments=this.props.state.student.payment;} 
      payments.push(enquiry);
  
      let received=Number(this.props.state.student.received),payment=Number(enquiry.payment)
      let total=received+payment,status;
      if(total===this.props.state.student.fee){
        status='Complete';
      }
      else{status='Pending';if(enquiry.dueDate===undefined){this.setState({error:'Please select next Due Date'});return;}}
  
      for (let i in ev.target.elements) {
        if (ev.target.elements[i].value !== undefined && ev.target.elements[i].value !== '') {
          ev.target.elements[i].value=null;
        }
      }
      this.setState({error:''});
  
      if(!enquiry.dueDate) enquiry.dueDate=null;
  
      body={payment:payments,status:status,dueDate:enquiry.dueDate,received:total};      
    }
    else{
      delete enquiry.date;
      body={dueDate:enquiry.dueDate};
    }

    axios.post('/updateStudent',{_id:this.props.state.student._id,body:body})
    .then(res=>{
        this.props.history.push('/student/'+this.props.state.student._id)
        this.props.updPayment(body)
    })    
  }
  statuses = ['Pending', 'Complete', 'Discontinued']
  modes = ['Cash', 'Card','Paytm','Online']
  onChange = (e) => {
      let status=e.target.value;

      let body={status:status,dueDate:null};

      axios.post('/updateStudent',{_id:this.props.state.student._id,body:body})
      .then(res=>{
          this.props.history.push('/student/'+this.props.state.student._id);
          this.setState({status:status,updFlag:true})
          // this.props.updPayment(body)
      })          
  }
  render() {
    let data = this.props.state.student,payment=data;
    console.log(data)
    return (
      <div  className="container">
      {data.payment.length!==0?
      <div>
        <h1>Student Payment Details</h1>        
        {(this.state.status==='Pending' ||(data.status==='Pending' && !this.state.updFlag))?
        <form onSubmit={this.onSubmit}>
          <br/>
          <div className="row">
            <div className="col-md-3 col-sm-12">
              Payment:<br /><input name="payment" type="number" className="form-control"/>
            </div>
            <div className="col-md-3 col-sm-12">
              Payment Date:<br /><input type="Date" name="date" className="form-control" defaultValue={getHTMLDate(new Date())}/>
            </div><div className="col-md-3 col-sm-12">
              Mode of Payment:<br />             
              <select className="form-control" name="mode">
              <option></option>
              {
                this.modes.map((status,i) => (
                        <option key={i}>{status}</option>
                ))
              }
            </select>
            </div>
            <div className="col-md-3 col-sm-12">Comment:<br /><input className="form-control" type="text" name="comment" /></div>
          </div>
          <div className="row">
            <div className="col-12">Next Due Date:<br /><input type="Date" name="dueDate" className="form-control"/></div>
          </div>
          <br/>
          {this.state.error!==''?<Alert variant="danger">{this.state.error}</Alert>:null}          
          <button className="form-control btn btn-dark">Submit</button>
        </form>:null}        
        <br/>  
        <h3>Payment Summary</h3>      
        <table className="table">
          <thead>
          </thead>
          <tbody>
          <tr><th>Name</th><td>{data.student}</td></tr>
          <tr><th>Mobile</th><td>{data.mobile}</td></tr>
          <tr><th>Email</th><td>{data.email}</td></tr>
          <tr><th>Course</th><td>{data.course}</td></tr>
          <tr><th>Fee</th><td>{data.fee}</td></tr>
          <tr><th>Received</th><td>{data.received}</td></tr>
          <tr><th>Balance</th><td>{data.fee-data.received}</td></tr>
          <tr><th>Status</th><td>
          {(this.state.status==='Pending' ||(data.status==='Pending' && !this.state.updFlag))?
              <select onChange={this.onChange} className="form-control" defaultValue={data.status}>
                <option></option>
              {
                this.statuses.map((status,i) => (
                    <option key={i}>{status}</option>
                ))
              }
            </select>
            :<span>{this.state.status!==''?this.state.status:data.status}</span> 
            }
            </td>
            </tr>
            <tr><th>Batch</th><td>{data.batch}</td></tr>
            <tr><th>Class Commencement</th><td>{data.classcomment}</td></tr>
            <tr><th>Trainer Name</th><td>{data.trainername}</td></tr>
            <tr><th>Trainer Fee</th><td>{data.trainerfee}</td></tr>
            <tr><th>Received By</th><td>{data.receivedby}</td></tr>
            <tr><th>Source</th><td>{data.source}</td></tr>
            <tr><th>Followup Date</th>
            <td>{data.dueDate?formatDate(new Date(data.dueDate)):null}</td></tr>
          </tbody>
        </table>
        <br/>
        <h3>Payment History</h3>
        <table className="table">
          <thead><tr><th>Amount</th><th>Mode</th><th>Paid on</th><th>Comments</th></tr></thead>
          <tbody>
          {payment.payment?payment.payment.map((pay,i) => (
            <tr key={i}><td>{pay.payment}</td><td>{pay.mode}</td><td>{formatDate(new Date(pay.date))}</td><td>{pay.comment}</td></tr>
          )):null}
          </tbody>
        </table>

      </div>:
    <div className="text-center"><img alt="loading" src={load}></img></div>}
    </div>
    );
  }
}

const mapStateToProps = (state) => { return { state: state } }

export default connect(mapStateToProps, mapDispatchStudent)(Student);