import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./NavBarExt.css";

function NavBarExt() {
    return (
        <div>
            <Navbar bg="transparent" variant="light">
                <Container>
                    <Nav className="me-auto" className="Container">
                        <Nav.Link href="/" className="nav-logo">
                            <h6
                                style={{
                                    fontSize: "3em",
                                    fontFamily: "Courgette",
                                    color: "#efb96e",
                                    fontWeight: "bold",
                                }}
                            >
                                wanderlust
                            </h6>
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <h5>Sign In</h5>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBarExt;
