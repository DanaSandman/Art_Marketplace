import React, { Component } from 'react';
import { EmptyState } from '../../../util/EmptyState';
import { List, ListItemText, Collapse, ListItem } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export class MobileTable extends Component {
  state = { itemsIsOpen: [false] };

  componentDidMount() {
    const isOpenArr = this.props.table.data.map(() => false);
    this.setState({ itemsIsOpen: isOpenArr });
  }

  showMore = (idx) => {
    // close all then open current item
    const updated = this.state.itemsIsOpen.map((item) => false);
    updated[idx] = true;
    this.setState({ itemsIsOpen: updated });
  };
  showLess = (idx) => {
    const updated = [...this.state.itemsIsOpen];
    updated[idx] = false;
    this.setState({ itemsIsOpen: updated });
  };

  render() {
    const { table, emptyTxt } = this.props;
    const { itemsIsOpen } = this.state;
    return (
      <>
        {table.data.length ? (
          <List>
            {table.data.map((item, i) => (
              <ListItem key={`i-${i}`}>
                <section
                  className='item-header'
                  onClick={() =>
                    itemsIsOpen[i] ? this.showLess(i) : this.showMore(i)
                  }
                >
                  <ListItemText
                    title={item.details[0]}
                    className='item-name'
                    primary={item.details[0]}
                  />
                  {itemsIsOpen[i] ? (
                    <ExpandLess className='item-expand-btn' />
                  ) : (
                    <ExpandMore className='item-expand-btn' />
                  )}
                </section>

                <Collapse
                  in={itemsIsOpen[i]}
                  timeout='auto'
                  unmountOnExit
                  className='item-collpasible'
                >
                  {item.btns.length && (
                    <section className='item-btns'>
                      {item.btns.map((btn) => btn)}
                    </section>
                  )}
                  <table>
                    <tbody>
                      {item.details.map((detail, j) => (
                        <tr key={`${i}-${j}`}>
                          <th title={table.columns[j]}>{table.columns[j]}</th>
                          <td title={detail}>{detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Collapse>
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState txt={emptyTxt} />
        )}
      </>
    );
  }
}
