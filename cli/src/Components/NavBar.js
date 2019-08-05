import React from 'react';
import {Link , NavLink,withRouter} from 'react-router-dom';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import axios from 'axios';
import {getCookie} from './General';

const NavBar=(props)=>{
  const logout=()=>{
    axios.post('/logout')
    .then(res=>{
      props.history.push('/login');  
    });
  }
    
  return(
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand><Link className="white" to="/">i-Train.co</Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  {getCookie('jwt')?
    <Nav className="mr-auto">
      <Nav.Link><NavLink className="navLink" to="/createEnq">Add-Enquiry</NavLink></Nav.Link>
      {getCookie('role')==='admin'?<Nav.Link><NavLink className="navLink" to="/createPayment">Add-Payment</NavLink></Nav.Link>:<span></span>}
      {getCookie('role')==='admin'?<Nav.Link><NavLink className="navLink" to="/createExpense">Add-Expense</NavLink></Nav.Link>:<span></span>}      
      <NavDropdown title="Summary" id="collasible-nav-dropdown">
        <NavDropdown.Item><Link to="/Enquiries">Enquiries</Link></NavDropdown.Item>
        {getCookie('role')==='admin'?<span><NavDropdown.Divider />
        <NavDropdown.Item><Link to="/PaymentSummary">Payment</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to="/ExpenseSummary">Expense</Link></NavDropdown.Item></span>:<span></span>}
      </NavDropdown>
    </Nav>:<span></span>}
    <Nav>
      <Nav.Link eventKey={2} href="#memes">
        {getCookie('jwt')?
      <button className="btn btn-dark" onClick={()=>logout()}>Logout</button>:
      <span></span>}

      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>)
}

export default withRouter(NavBar);
