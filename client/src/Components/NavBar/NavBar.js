import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { logout } from "../../utils";
import { useHistory } from "react-router-dom";
function NavBar() {
    const history = useHistory();
    const handleLogout = () => {
        logout();
        history.push("/login");
    };
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home">Home</Navbar.Brand>
                <Navbar.Brand href="/profile">Profile</Navbar.Brand>
                <Nav className="me-auto">
                    <Button
                        variant="danger"
                        type="button"
                        onClick={handleLogout}
                    >
                        Log Out
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
