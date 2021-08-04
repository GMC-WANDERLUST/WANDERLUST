import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import "./CardHost.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titre: {
    fontWeight: "bold",
  },
  inline: {
    display: "inline",
  },
}));
const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  style: { width: "18rem", height: "21rem" },
  borderColor: "none",
  boxShadow:
    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
};
function CardPost({ token, host, id }) {
  const classes = useStyles();
  const handleDelete = () => {
    axios
      .delete(`/api/admin/deleteHost/${id}`, {
        headers: {
          jwt: token,
          data: host._id,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => console.dir(error));
  };
  const saveUserId = () => {
    sessionStorage.setItem("randomId", host.host);
  };
  return (
    <div className="wl-card-item">
      <Box display="flex" justifyContent="center">
        <Box border={0} {...defaultProps}>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="host photo" src={host.img} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link to={`/uprofile/${host.host}`} onClick={saveUserId}>
                    <h4>
                      {host.firstName.toUpperCase()} <br />
                      {host.lastName.toUpperCase()}
                    </h4>
                  </Link>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      // variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      <span className={classes.titre}>Residence :</span>
                      {host.residence.toUpperCase()}
                      <br />
                      <span className={classes.titre}>City :</span>
                      {host.city.toUpperCase()}
                      <br />
                      <span className={classes.titre}>
                        Number of Rooms:
                      </span>{" "}
                      {host.nbreOfRooms}
                      <br />
                      <span className={classes.titre}>
                        Number of Beds :
                      </span>{" "}
                      {host.nbreOfBeds}
                      <br />
                      <span className={classes.titre}>Price :</span>{" "}
                      {host.price} $
                      <br />
                      <span className={classes.titre}>Description :</span>
                      {host.description}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <div>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
            <Divider variant="inset" component="li" />
          </List>
        </Box>
      </Box>
    </div>
  );
}

export default CardPost;
