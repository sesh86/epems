import React, { Component } from 'react';
import PageTable from './PageTable'
import '../App.css';
import load from '../load.gif';
import {ButtonToolbar,Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { mapDispatchEnqs } from '../Reducer/action';
import {getDate,dateFormat,getCookie} from './General';


class Enquiries extends Component {
  componentDidMount() { }
  constructor(props) {
    super(props);
    if(!getCookie('jwt')) this.props.history.push('/login');
    
    this.state = {
      options: { searching:false,options: {}, filter: 'All', orderBy: { "dueDate": 1 }, page: 1, rows: 10,sort:8,order:0},
      res: { "count": 0, "data": [] },
    }
    this.callAPI()
  }
  callAPI = () => {
    console.log(this.state.search)
    this.props.getEnqs(this.state.options);
  }
  getPage = (e) => {
    let options = this.state.options;
    options['page'] = e;
    this.setState = { curr: Number(e), options: options }
    this.callAPI();
  }
  sortBy = (e) => {
    let data = Object.keys(this.props.state.enquiries.header);
    let options = this.state.options;
    
    if(this.props.state.enquiries.header['_id']){data.shift();}

    if (options.orderBy[data[e]] === 1) {
      options.order=1;
      options.orderBy = {};
      options.orderBy[data[e]] = -1;
    }
    else {
      options.order=0;
      options.orderBy = {};
      options.orderBy[data[e]] = 1;
    }
    options.sort=e;
    
    this.setState = { options: options }
    this.callAPI();
  }
  searchForCourse = (ev) => {
    console.log(ev.target.value)
    console.log(ev.target.name)
    let and={};
    

    let options = this.state.options;
    if(ev.target.value!=='')
      options.options[ev.target.name]=ev.target.value;
    else 
      delete options.options[ev.target.name]
    // for(let i in options){
    //   if(options[i]['$and']) delete options[i]
    // }    
    // let opt=options.options;
    // opt.map((e,i)=>{
    //   if(e['$and']){opt.splice(i,1)}
    // });
    
    // if(and.length>0)
    //   options.options = { "$and": and };

    this.setState = { options: options}
    this.callAPI();

  }
  searchFor = (e) => {
    if (e.key === 'Enter') {
      this.props.changeLoading();
      let search = []
      let header = this.props.state.enquiries.header;
      let keys = [], heads = Object.keys(header),num=[];
      for (let i in heads) {
        if (header[heads[i]] === 'String') {
          keys.push(heads[i])
        }
        else if (header[heads[i]] === 'Number') {
          num.push(heads[i])
        }        
      }

      for (let i in keys) {
        let fieldName = keys[i], m = {}
        m[fieldName] = { $regex: e.target.value, $options: 'i' }
        search.push(m);
      }
      if(!isNaN(e.target.value)){
        for (let j in num) {
          let fieldName = num[j], m = {}
          m[fieldName] = e.target.value;
          search.push(m);
        }      
      }
      
      let options = this.state.options;
      options.options["$or"]= search ;
      this.setState = { options: options}
      this.callAPI();
    }
  }
  emps=['Ramya','Ram','Divya','Aarti','Bharath'];
  sources = ['Walkin', 'Google', 'Sulekha', 'UrbanPro', 'Direct Call', 'Direct Email', 'Reference']
  courses = ['Aws Sysops','AWS Training','Azure Infra Structure','Azure Architecture','Azure Developer','Azure DevOps','BlockChain','Google Cloud','Salesforce','Salesforce Admin','Salesforce Developer','Data Analytics','Alteryx','Artificial Intelligence','Chatbots using python','Data Science','Data Science Using R','Data Science Using Python','Datastage','Deep Learning Using Python','Informatica','Informatica MDM','Machine Learning Using R','Machine learning Using Python','Power BI','QlikSense','QlikView','Tableau','Big Data','Big Data Analytics','Hadoop','Spark and Scala','Pyspark','RPA','Automation Anywhere','Blue Prism','UiPath','Networking','CCNA Swtiching and Routing','CCNA Security','CCNP Security','CCNP Swtiching and Routing','CCIE','Cyber Security','Ethical Hacking','Django','GO Language','Python','UNIX Shell','Web Development','Angular 7','Angular JS','Full Stack','Java Script','MEAN Stack','MERN Stack','Node JS','PHP','React Js','UI Developer','Vue Js','Web Designing','Android','C&C++','Core Java','Data Structure & Algorithm','DotNet','Hibernate','iOS','IOT Using Python','IOT','J2EE','Java','Linux','MVC','Oracle','PLSQL','Spring','SQL','Struts','Software Testing','Automation Testing','Coded UI','ETL Testing','Jmeter','LoadRunner','Manual Testing','QTP','Selenium with C#','Selenium with Java','Selenium with Python','Pega','Other']
  statuses = ['Open', 'Closed','Visited','Demo Attended','In-Progress','Joined']
  render() {
    let res = this.props.state.enquiries,header=res.header,options=this.state.options,loading=this.props.state.loading;

    res.data=dateFormat(res.data,getDate(header));
    let searched='';
    try{
      searched=this.state.options.options['$or'][0].name['$regex'];
    }
    catch(e){}
    console.log(searched)
    return (
      <div className="container">        
      {!loading?
      <div>
      <h5>Filters</h5>
      <form onChange={this.searchForCourse}>
      <div className="row">
      <div className="col-4">
          Course
        <select  name="course" className="form-control" defaultValue={this.state.options.options.course}>
          <option></option>
          {this.courses.map((c,i)=><option key={i}>{c}</option>)}
        </select>
        </div>
        <div className="col-4">
        Status
        <select name="status" className="form-control">
          <option></option>
          {this.statuses.map((s,i)=><option key={i}>{s}</option>)}
        </select>
        </div>
        <div className="col-4">
        Assigned To        
        <select name="assignedto" className="form-control">
          <option></option>
          {this.emps.map((e,i)=><option key={i}>{e}</option>)}
        </select>
        </div>        
      </div>
      </form>
      <PageTable link='enquiry' res={res} header={header} getPage={this.getPage} sortBy={this.sortBy} searched={searched} searchFor={this.searchFor} options={options}/>
      </div>
      :
      <div className="text-center"><img alt="loading" src={load}/></div>
      }

      </div>
    );
  }
}

const mapStateToProps = (state) => { return { state: state } }
export default connect(mapStateToProps, mapDispatchEnqs)(Enquiries);
