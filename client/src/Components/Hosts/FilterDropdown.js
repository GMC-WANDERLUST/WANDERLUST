import React, { useState } from "react";
import {
    Dropdown,
    DropdownButton,
    ButtonGroup,
    Form,
    CloseButton,
} from "react-bootstrap";
import "./FilterDropDown.css";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import moment from "moment-timezone";
import "../Posts/FilterDropDown.css";
////////////////////////////////////////////////////////////////////////////////////////////////

function FilterDropdown() {
    var n = Date.now();
    const [selectedDate, setSelectedDate] = React.useState(
        moment(n).format("YYYY-MM-DD")
    );
    const [showCityFilter, setShowCityFilter] = useState(false);
    const [cityData, setCityData] = useState("");
    const [showDateFilter, setShowDateFilter] = useState(false);

    const handelCityFilter = () => {
        setShowCityFilter(true);
        setShowDateFilter(false);
    };
    const handleClose = () => {
        setShowCityFilter(false);
    };
    const handelCityChange = (e) => {
        setCityData(e.target.value);
    };
    const handleCloseDate = () => {
        setShowDateFilter(false);
    };
    const saveFilter = () => {
        sessionStorage.removeItem("residence");
        sessionStorage.removeItem("check_in");
        sessionStorage.setItem("city", cityData);
        // window.location.reload();
        window.location.reload();
    };
    const handleDateFilter = () => {
        setShowDateFilter(true);
        setShowCityFilter(false);
    };
    const handleDateChange = (date) => {
        setSelectedDate(moment(date).format("YYYY-MM-DD"));
    };
    let residenceData = localStorage.getItem("residence");
    const handelSaveDateFilter = () => {
        sessionStorage.removeItem("city");
        sessionStorage.setItem("residence", residenceData);
        sessionStorage.setItem("check_in", selectedDate);
        window.location.reload();
    };
    const handleClearFilter = () => {
        sessionStorage.removeItem("city");
        sessionStorage.removeItem("check_in");
        sessionStorage.setItem("residence", residenceData);
        window.location.reload();
    };
    return (
        <div className="filter-container">
            <div className="mb-2">
                <DropdownButton
                    as={ButtonGroup}
                    key="down"
                    id="dropdown-button-drop-down"
                    drop="down"
                    size="lg"
                    variant="secondary"
                    title="Filter Search"
                >
                    <Dropdown.Item eventKey="2" onClick={handleClearFilter}>
                        Clear Filter
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="1" onClick={handelCityFilter}>
                        City filter
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2" onClick={handleDateFilter}>
                        Date Filter
                    </Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="cityFilter">
                {showCityFilter ? (
                    <div className="cityFilterBox">
                        <div className="close-btn">
                            <CloseButton onClick={handleClose} />
                        </div>
                        <div className="city">
                            <input
                                type="text"
                                placeholder="Enter City"
                                name="city"
                                onChange={handelCityChange}
                            />
                        </div>

                        <div className="wl-ok-button">
                            <Button
                                variant="contained"
                                color="default"
                                onClick={saveFilter}
                            >
                                OK
                            </Button>
                        </div>
                    </div>
                ) : null}
                {showDateFilter ? (
                    <div className="dateFilterBox">
                        <div className="close-btn">
                            <CloseButton onClick={handleCloseDate} />
                        </div>
                        <div className="date">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid xm={12} sm={8} alignItems="center">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        name="check_in"
                                        format="yyyy-MM-dd"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="wl-ok-button">
                            <Button
                                variant="contained"
                                color="default"
                                onClick={handelSaveDateFilter}
                            >
                                OK
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default FilterDropdown;
