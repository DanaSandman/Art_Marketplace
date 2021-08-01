import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Logo } from '../../util/Logo';
import { SearchModal } from '../../util/SearchModal';

export class MobileNav extends Component {
  state = { isDrawerOpen: false, isSearchOpen: false };
  openDrawer = () => this.setState({ isDrawerOpen: true });
  closeDrawer = () => this.setState({ isDrawerOpen: false });
  openSearch = () => this.setState({ isSearchOpen: true });
  closeSearch = () => this.setState({ isSearchOpen: false });
  getDrawerData = () => [
    {
      label: 'Home',
      href: '/home',
    },
    {
      label: 'Explore',
      href: '/art',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Wishlist',
      href: '/wishlist',
    },
    {
      label: 'Account',
      href: '/account',
    },
  ];
  getHeaderData = () => [
    {
      label: <Logo />,
      href: '/home',
      onClick: null,
    },
    {
      // label: <h4>Search</h4>,
      label: <SearchIcon />,
      href: '#',
      onClick: this.openSearch,
    },
    {
      // label: <h4>sal</h4>,
      label: <LocalMallOutlinedIcon />,
      href: '/cart',
      onClick: null,
    },
    {
      label: <FavoriteIcon />,
      href: '/wishlist',
      onClick: null,
    },
    {
      label: <AccountCircleIcon />,
      href: '/account',
      onClick: null,
    },
  ];

  render() {
    const { isDrawerOpen, isSearchOpen } = this.state;
    return (
      <div className='mobile-nav'>
        <AppBar className='app-header'>
          <Toolbar>
            <IconButton
              {...{
                edge: 'start',
                color: 'inherit',
                'aria-label': 'menu',
                'aria-haspopup': 'true',
                onClick: this.openDrawer,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              {...{
                anchor: 'left',
                open: isDrawerOpen,
                onClose: this.closeDrawer,
                PaperProps: { className: 'drawer-content' },
              }}
            >
              <IconButton
                onClick={this.closeDrawer}
                className='close-menu-modal-btn'
              >
                <CloseIcon />
              </IconButton>
              <div>
                {this.getDrawerData().map(({ label, href }, idx) => {
                  return (
                    <Link
                      {...{
                        component: RouterLink,
                        to: href,
                        color: 'inherit',
                        style: { textDecoration: 'none' },
                        key: idx,
                        onClick: this.closeDrawer,
                      }}
                    >
                      <MenuItem>{label}</MenuItem>
                    </Link>
                  );
                })}
              </div>
            </Drawer>
            <nav>
              {this.getHeaderData().map(({ label, href, onClick }, idx) => (
                <Link
                  {...{
                    component: RouterLink,
                    to: href,
                    color: 'inherit',
                    style: { textDecoration: 'none' },
                    key: idx,
                    onClick: onClick,
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <SearchModal isOpen={isSearchOpen} closeSearch={this.closeSearch} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
