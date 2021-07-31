import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./NavBarExt.css";

function NavBarExt() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto" className="Container">
                        <Nav.Link href="/">WANDERLUST</Nav.Link>
                        <div className="login_register">
                            <Nav.Link href="login">Login</Nav.Link>
                            <Nav.Link href="register">Register</Nav.Link>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBarExt;
