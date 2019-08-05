import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
// import {mapDispatchLogin} from '../Reducers/Action';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={alert:''}
  }
  onSubmit=(ev)=>{
    ev.preventDefault();
    let login={};
    
    for(let i in ev.target.elements){
        if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!==''){
          login[ev.target.elements[i].name]=ev.target.elements[i].value;
        }
    }
    axios.post('/login',login)
    .then(res=>{
      if(res.data==='Invalid User Name or password')
        this.setState({alert:res.data})
      else{
        this.setState({alert:''})
        this.props.history.push('/')
      }  
      console.log(res);
    });
  }

  render() {
    return (
      <div className="container cat">
        <br/>
        <br/>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          User Name<input type="text" name="email" required className="form-control"/>
          Password   <input type="Password" name="password"  required  className="form-control"/>
          <br/>
          <div hidden={!this.state.alert} className="alert alert-danger" role="alert">{this.state.alert}</div>
          <button className="form-control btn btn-dark">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps)(Login);
