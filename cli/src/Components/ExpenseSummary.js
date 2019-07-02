import React, { Component } from 'react';
import PageTable from './PageTable'
import '../App.css';
import load from '../load.gif';
import {ButtonToolbar,Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { mapDispatchExpenses } from '../Reducer/action';
import {getDate,dateFormat} from './General';

class ExpenseSummary extends Component {
  componentDidMount() { }
  constructor(props) {
    super(props);

    this.state = {
      options: { searching:false,options: {}, filter: 'default', orderBy: { "dueDate": 1 }, page: 1, rows: 10,sort:6,order:0},
      res: { "count": 0, "data": [] },
    }
    this.callAPI()
  }
  callAPI = () => {
    this.props.getExpenses(this.state.options);
  }
  getPage = (e) => {
    let options = this.state.options;
    options['page'] = e;
    this.setState = { curr: Number(e), options: options }
    this.callAPI();
  }
  getAll = () => {
    let options = this.state.options,filt=this.state.filt;
    options.options={}
    if(options.filter==='All'){
      options.filter='default'
      filt='with DueDate';
    }
    else{
      options.filter='All'
      filt='All'
    }
    this.setState = { options: options,filt:filt }
    this.callAPI();
  }  
  sortBy = (e) => {
    let data = Object.keys(this.props.state.exoenses.header);
    let options = this.state.options;
    
    if(this.props.state.exoenses.header['_id']){data.shift();}

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
  searchFor = (e) => {
    
    if (e.key === 'Enter') {
      this.props.changeLoading();
      let search = []
      let header = this.props.state.expenses.header;
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
      options.options = { "$or": search };
      this.setState = { options: options }
      this.callAPI();
    }
  }
  render() {
    let res = this.props.state.expenses,header=res.header,options=this.state.options,loading=this.props.state.loading;
    res.data=dateFormat(res.data,getDate(header));
    return (
      <div className="container">        
        <ButtonToolbar><Button onClick={()=>this.getAll()} variant="secondary ">{this.state.options.filter==='All'?'Show Expenses with Due Date':'Show All Expenses'}</Button></ButtonToolbar >
      {!loading?
      <PageTable link='Expense' res={res} header={header} getPage={this.getPage} title='Expense Summary' sortBy={this.sortBy} searchFor={this.searchFor} options={options}/>
      :
      <div className="text-center"><img alt="loading" src={load}/></div>
      }

      </div>
    );
  }
}

const mapStateToProps = (state) => { return { state: state } }
export default connect(mapStateToProps, mapDispatchExpenses)(ExpenseSummary);
