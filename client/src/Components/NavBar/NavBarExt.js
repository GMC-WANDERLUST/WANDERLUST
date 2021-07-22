import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

function NavBarExt() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="/">WANDERLUST</Nav.Link>
                        <Nav.Link href="login">Login</Nav.Link>
                        <Nav.Link href="register">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBarExt;
