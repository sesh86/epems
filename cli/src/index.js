import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Student from './Components/Student';
import Expense from './Components/Expense';
import PaymentSummary from './Components/PaymentSummary';
import Enquiries from './Components/Enquiries';
import ExpenseSummary from './Components/ExpenseSummary';
import CreatePayment from './Components/CreatePayment';
import CreateExpense from './Components/CreateExpense';
import CreateEnq from './Components/CreateEnq';
import Enquiry from './Components/Enquiry';
import Login from './Components/Login';
import EditEnquiry from './Components/EditEnquiry';


import NavBar from './Components/NavBar';
// import PageTable from './Components/PageTable';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './Reducer/reducer'
import {BrowserRouter, Route,Switch} from 'react-router-dom'
const store = createStore(rootReducer);

ReactDOM.render(
<Provider store={store}>

<BrowserRouter>
<div>
<NavBar/>
<Switch>
<Route exact path="/" component={Enquiries}/>
<Route exact path="/paymentSummary" component={PaymentSummary}/>
<Route exact path="/expenseSummary" component={ExpenseSummary}/>
<Route path="/student/:sid" component={Student}/>
<Route path="/expense/:sid" component={Expense}/>
<Route path="/CreatePayment" component={CreatePayment}/>
<Route path="/CreateExpense" component={CreateExpense}/>
<Route path="/CreateEnq" component={CreateEnq}/>
<Route path="/Enquiries" component={Enquiries}/>
<Route path="/Enquiry/:sid" component={Enquiry}/>
<Route path="/Login" component={Login}/>
<Route path="/edit/enquiry/:sid" component={EditEnquiry}/>

</Switch>
</div>
</BrowserRouter>

</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
