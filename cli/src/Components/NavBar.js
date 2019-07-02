import React from 'react';
import {Link , NavLink,withRouter} from 'react-router-dom';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'

const NavBar=(props)=>{
  return(
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">i-Train.co</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link><NavLink className="navLink" to="/Enquiries">Enquiries</NavLink></Nav.Link>
      <Nav.Link><NavLink className="navLink" to="/PaymentSummary">Payments</NavLink></Nav.Link>
      <Nav.Link><NavLink className="navLink" to="/ExpenseSummary">Expenses</NavLink></Nav.Link>      
      <NavDropdown title="New" id="collasible-nav-dropdown">
        <NavDropdown.Item><Link to="/createEnq">Enquiry</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to="/createPayment">Payment</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to="/createExpense">Expense</Link></NavDropdown.Item>        
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">About</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Login
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>)
}

export default withRouter(NavBar);
