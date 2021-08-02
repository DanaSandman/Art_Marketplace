import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { cartService } from '../../services/cart/cart.service.js'

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}


async function getItems() {

  const items = await cartService.query()
  return items

}

const initItems = getItems()

export function Cart() {

  const classes = useStyles();
  const [items, setItems] = React.useState(initItems)


  function subtotal(items) {
    console.log('items', items);
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  return (

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[{imgUrl: 'eeee', title:'hhh', price: 10, artist: {fullname: 'ggg'}}].map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>
              <img src={item.imgUrl} className={classes.img}/>
                </TableCell>
                <TableCell>
                <span>{item.title}</span>
                      <span className="item-style">{`By ${item.artist.fullname}`}</span>
                </TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{1}</TableCell>
              <TableCell align="right">{ccyFormat(item.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(12)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(12)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(12)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
