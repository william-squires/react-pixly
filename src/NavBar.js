import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Pixly</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/new">Editor</Nav.Link>
            <Nav.Link as={Link} to="/all">Images</Nav.Link>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
