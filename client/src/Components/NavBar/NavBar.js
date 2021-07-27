import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { logout } from "../../utils";
import { useHistory } from "react-router-dom";
import { userId, getToken, getIsAdmin } from "../../utils";
import DropDown from "../../Components/UserProfil/DropDown";
import axios from "axios";

function NavBar() {
  let id = userId();
  console.log(id);
  let token = getToken();
  let isAdmin = getIsAdmin();
  console.log(isAdmin);
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  const [travellerSelected, setTravellerSelected] = useState(false);
  const [hostSelected, setHostSelected] = useState(false);
  const [discoverSelected, setDiscoverSelected] = useState(true);
  const [destinationData, setDestinationData] = useState("");

  const initialStates = () => {
    setTravellerSelected(false);
    setHostSelected(false);
    setDiscoverSelected(false);
  };

  const findTravellers = () => {
    initialStates();
    setTravellerSelected(true);
  };
  const findHosts = () => {
    initialStates();
    setHostSelected(true);
  };
  const handelDiscover = () => {
    initialStates();
    setDiscoverSelected(true);
  };
  const handelChange = (e) => {
    setDestinationData(e.target.value);
  };
  const handleSearch = () => {
    // console.log(destinationData);
    if (travellerSelected) {
      axios
        .get(`/api/posts/allPosts/${id}`, {
          headers: {
            jwt: token,
            data: destinationData,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.dir(error));
      history.push("/postsList");
    }
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Navbar.Brand href={`/profile/${id}`}>Profile</Navbar.Brand>

        <Navbar.Brand href={`/adminUi/${id}`}>{isAdmin==="true" ? "Admin" :null  } </Navbar.Brand>
        {console.log(isAdmin)}
        <Nav className="me-auto">
          <NavDropdown
            title={
              travellerSelected
                ? "Find Travellers"
                : hostSelected
                ? "Find Hosts"
                : discoverSelected
                ? "Discover"
                : null
            }
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1" onClick={handelDiscover}>
              Discover
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1" onClick={findTravellers}>
              Find Travellers
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2" onClick={findHosts}>
              Find Hosts
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder={
                travellerSelected
                  ? "Enter your residence"
                  : hostSelected
                  ? "Enter your destination"
                  : "Search"
              }
              className="mr-2"
              aria-label="Search"
              name="destination"
              onChange={handelChange}
            />
            <Button variant="outline-success" onClick={handleSearch}>
              Search
            </Button>
          </Form>
          <DropDown />
          <Button variant="danger" type="button" onClick={handleLogout}>
            Log Out
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
