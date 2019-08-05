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
import { mapDispatchEnquiry } from '../Reducer/action'

class Enquiry extends Component {
  constructor(props) {
    super(props);
    if(!getCookie('jwt')) this.props.history.push('/login');
    this.props.getEnq({name: this.props.match.params.sid });
    this.state={error:'',status:'',updFlag:false}
  }
  componentDidMount() { }
  onSubmit = (ev) => {
    ev.preventDefault();
    let comm = {};

    for (let i in ev.target.elements) {
      if (ev.target.elements[i].value !== undefined && ev.target.elements[i].value !== '') {
        comm[ev.target.elements[i].name] = ev.target.elements[i].value;
      }
    }

    let body={}
    // if(enquiry.dueDate===undefined){
      if(comm.comment===undefined){this.setState({error:'Please enter comment'});return;}
      if(comm.status===undefined){this.setState({error:'Please select a status'});return;}
      console.log(comm.dueDate);
      console.log(comm.status);
      let followup=true,closed=['Joined','Closed'];

      for(let i in closed ){
        console.log(i)
        console.log(i)
        if(closed[i]==comm.status){
          followup=false;break;
        }
      }
      if((comm.dueDate===undefined) && followup){this.setState({error:'Please select a dueDate'});return;}

      let comments=[];
      if(this.props.state.enquiry.comments){comments=this.props.state.enquiry.comments;} 
      // console.log(comments)
      comments.push(comm);
      // console.log(comm)
      // return;
  
      for (let i in ev.target.elements) {
        if (ev.target.elements[i].value !== undefined && ev.target.elements[i].value !== '') {
          ev.target.elements[i].value=null;
        }
      }
      this.setState({error:''});
  
      if(!comm.dueDate) comm.dueDate=null;
  
      body={comments:comments,status:comm.status,dueDate:comm.dueDate};
    // }
    // else{
    // console.log('else')
    //   delete enquiry.date;
    //   body={dueDate:enquiry.dueDate};
    // }
    console.log(body)
    // return;
    axios.post('/updateEnq',{_id:this.props.state.enquiry._id,body:body})
    .then(res=>{
        this.props.history.push('/enquiry/'+this.props.state.enquiry._id)
        this.props.updEnq(body)
    })    
  }
  statuses = ['Open', 'Closed','Visited','Demo Attended','In-Progress','Joined']

  render() {
    let data = this.props.state.enquiry,enq=data;
    return (
      <div  className="container">
      <div>
        <h1>enquiry Details</h1>   
             
        {(this.state.status!=='Closed')?
        <form onSubmit={this.onSubmit}>
          <br/>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              Comment:<br /><input name="comment" type="text" className="form-control"/>
            </div>
            <div className="col-md-4 col-sm-12">
              Comment Date:<br /><input type="Date" name="date" className="form-control" defaultValue={getHTMLDate(new Date())}/>
            </div>
            <div className="col-md-4 col-sm-12">
              Status<br />
              <select name="status" className="form-control">
              <option></option>
              {
                this.statuses.map((status,i) => (
                    <option key={i}>{status}</option>
                ))
              }
            </select>            
            </div>            

          </div>
          <div className="row">
            <div className="col-12">Next Due Date:<br /><input type="Date" name="dueDate" className="form-control"/></div>
          </div>
          <br/>
          {this.state.error!==''?<Alert variant="danger">{this.state.error}</Alert>:null}          
          <button className="form-control btn btn-dark">Submit</button>
        </form>:null}        
        <br/>  
        <table className="table">
          <thead>
          </thead>
          <tbody>
          {/* var enqs = mongoose.model('enqs', {name: String, mobile:String, email:String,course:String,source:String,location:String,assignedto:String,status:String,dueDate:Date,enquiries:JSON}); */}

          <tr><th>Name</th><td>{data.name}</td></tr>
          <tr><th>Mobile</th><td>{data.mobile}</td></tr>
          <tr><th>Email</th><td>{data.email}</td></tr>
          <tr><th>Course</th><td>{data.course}</td></tr>
          <tr><th>Source</th><td>{data.source}</td></tr>
          <tr><th>Location</th><td>{data.location}</td></tr>
          <tr><th>Assignedto</th><td>{data.assignedto}</td></tr>
          <tr><th>Status</th><td>{data.status}


            </td>
            </tr>          
            <tr><th>Followup Date</th>
            <td>{data.dueDate?formatDate(new Date(data.dueDate)):null}</td></tr>
          </tbody>
        </table>
        <br/>
        <h3>Comments History</h3>
        <table className="table">
          <thead><tr><th>Comment</th><th>Date</th></tr></thead>
          <tbody>
          {enq.comments?enq.comments.map((pay,i) => (
            <tr key={i}><td>{pay.comment}</td><td>{formatDate(new Date(pay.date))}</td></tr>
          )):null}
          </tbody>
        </table>

      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => { return { state: state } }

export default connect(mapStateToProps, mapDispatchEnquiry)(Enquiry);