import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { wishlistService } from "../../services/wishlist/wishlist.service.js";

const useStyles = makeStyles({
  list: {
    width: 450,
  },
  fullList: {
    width: "auto",
  },
  img: {
    maxWidth: 70,
    margin: 10,
  },
});

export function SideCartWishList(addedItem) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [items, setItemes] = React.useState([]);

  const toggleDrawer = (open) => (event) => {
    console.log("toggleDrawer");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const addToCart = async () => {
    console.log("add to cart");
    await wishlistService.add(addedItem.addedItem);
    console.log("moshe");

    setItemes(await wishlistService.query());

    setDrawerOpen(true);
  };

  const removeFromCart = async () => {
    console.log("a102");
    setItemes(await wishlistService.remove("a102"));
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.root}>
        {items &&
          items.map((item) => (
            <ListItem>
              <img src={item.imgUrl} className={classes.img} />
              <ListItemText
                primary={item.title}
                secondary={`by ${item.artist.fullname} | $${item.price}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon onClick={() => removeFromCart(item._id)} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <button className="btn-add-to-wishlist" type="button" onClick={addToCart}>
        ♡ WISHLIST
      </button>
      <React.Fragment key={"right"}>
        <Drawer
          anchor={"right"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {list("right")}
          <div className="side-card">
          <button className="btn-add-to-bag">
            <Link className="btn-add-to-bag" to={`/wishlist`}>VIEW WISHLIST</Link>
          </button>
          <Link to={`/art`}> continue shopping</Link>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
