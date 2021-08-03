import React, { useState } from "react";
import {
    Dropdown,
    DropdownButton,
    ButtonGroup,
    Form,
    CloseButton,
} from "react-bootstrap";
import "./FilterDropDown.css";
import {useHistory} from "react-router-dom"

function FilterDropdown() {
    const [showCityFilter, setShowCityFilter] = useState(false);
    const [cityData, setCityData] = useState("");
    // const history = useHistory();
    const handelCityFilter = () => {
        setShowCityFilter(true);
    };
    const handleClose = () => {
        setShowCityFilter(false);
    };
    const handelCityChange = (e) => {
        setCityData(e.target.value);
    };
    const saveFilter = () => {
        sessionStorage.removeItem("destination");
        sessionStorage.setItem("city", cityData);
        // window.location.reload();
        window.location.reload();
    };
    return (
        <div className="mb-2">
            <DropdownButton
                as={ButtonGroup}
                key="down"
                id="dropdown-button-drop-down"
                drop="down"
                variant="secondary"
                title="Filter"
            >
                <Dropdown.Item eventKey="1" onClick={handelCityFilter}>
                    City filter
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </DropdownButton>
            <div className="cityFilter">
                {showCityFilter ? (
                    <div className="cityFilterBox">
                        <Form.Group>
                            <Form.Control
                                type="button"
                                value="OK"
                                onClick={saveFilter}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Enter City"
                                name="city"
                                onChange={handelCityChange}
                            />
                        </Form.Group>
                        <CloseButton onClick={handleClose} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default FilterDropdown;
