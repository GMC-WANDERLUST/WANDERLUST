import React from 'react';
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";

function DropDown() {
    return (
        <React.Fragment>
            <Dropdown as={ButtonGroup}>
                <Button variant="success"></Button>

                <Dropdown.Toggle
                    split
                    variant="success"
                    id="dropdown-split-basic"
                />

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        Something else
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
}

export default DropDown;
