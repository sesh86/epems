import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {getHTMLDate} from './General';
import Alert from 'react-bootstrap/Alert'
class CreateEnq extends Component {
  emps=['Ramya','Ram','Divya','Aarti','Bharath'];	
  sources = ['Walkin', 'Google', 'Sulekha', 'UrbanPro', 'Direct Call', 'Direct Email', 'Reference']
  courses = ['Aws Sysops','AWS Training','Azure Infra Structure','Azure Architecture','Azure Developer','Azure DevOps','BlockChain','Google Cloud','Salesforce','Salesforce Admin','Salesforce Developer','Data Analytics','Alteryx','Artificial Intelligence','Chatbots using python','Data Science','Data Science Using R','Data Science Using Python','Datastage','Deep Learning Using Python','Devops','Informatica','Informatica MDM','Machine Learning Using R','Machine learning Using Python','Power BI','QlikSense','QlikView','Tableau','Big Data','Big Data Analytics','Hadoop','Spark and Scala','Pyspark','RPA','Automation Anywhere','Blue Prism','UiPath','Networking','CCNA Swtiching and Routing','CCNA Security','CCNP Security','CCNP Swtiching and Routing','CCIE','Cyber Security','Ethical Hacking','Django','GO Language','Python','UNIX Shell','Web Development','Angular 7','Angular JS','Full Stack','Java Script','MEAN Stack','MERN Stack','Node JS','PHP','React Js','UI Developer','Vue Js','Web Designing','Android','C&C++','Core Java','Data Structure & Algorithm','DotNet','Hibernate','iOS','IOT Using Python','IOT','J2EE','Java','Linux','MVC','Oracle','PLSQL','Spring','SQL','Struts','Software Testing','Automation Testing','Coded UI','ETL Testing','Jmeter','LoadRunner','Manual Testing','QTP','Selenium with C#','Selenium with Java','Selenium with Python','Pega','Other']
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
    console.log(login.comment)
    let comments=[],comment;
    if(login.comment!==undefined && login.comment!=='')
        comment=login.comment;

    login['comments']=[{comment:comment,date:new Date()}];

    axios.post('/createEnq',login)
    .then(res=>{
        this.props.history.push('/Enquiries')
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
          Email<input type="email" name="email" className="form-control"/>
          Course*<select required name="course" className="form-control"><option></option>{this.courses.map((course,i) => (<option key={i}>{course}</option>))}</select>
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
