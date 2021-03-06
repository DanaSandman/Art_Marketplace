import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { cartService } from "../../services/cart/cart.service.js";
import { Link } from "react-router-dom";

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

export function SideCart(addedItem) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [items, setItemes] = React.useState([]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const addToCart = async () => {

    await cartService.add(addedItem.addedItem);
    setItemes(await cartService.query());
    setDrawerOpen(true);
  };

  const removeFromCart = async () => {
    setItemes(await cartService.remove("a102"));
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

  const total = () => {
    return items.reduce((tot, item) => tot + item.price, 0);
  };

  return (
    <div>
      <button className="btn-add-to-bag" type="button" onClick={addToCart}>
        ADD TO BAG
      </button>
      <React.Fragment key={"right"}>
        <Drawer
          anchor={"right"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {list("right")}
          <div className="side-card">
          
          {`Total - $${total()}`}
          <button className="btn-add-to-bag">
            <Link  className="btn-add-to-bag" to={`/cart`}>VIEW CART</Link>
          </button>
          <Link to={`/art`}> continue shopping</Link>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
