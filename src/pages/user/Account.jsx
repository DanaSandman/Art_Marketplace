import React, { Component } from 'react';
import { connect } from 'react-redux';
//CMPS
import { UserDashboard } from '../../cmps/user/dashboard/UserDashboard.jsx';
import { LoginSignUpReset } from '../../cmps/user/LoginSignUpReset.jsx';
//ACTION USER
import {
  loadLoggedInUser,
  login,
  logout,
  signup,
  updateUser,
  resetPassword,
  // loadUsers
} from '../../store/user/user.action.js';
//ACTION ART
import { removeArt, loadArts } from '../../store/art/art.action.js';

class _Account extends Component {

  componentDidMount() {
    if(this.props.loggedInUser !== null){
      console.log('acc loggedInUser');
      this.props.loadLoggedInUser();
    }
    if (!this.props.arts.length) this.props.loadArts();

    const { tab } = this.props.match.params;
    console.log('tab acc',tab);

    if (!tab || tab === 'undefined') this.props.history.push('/account/login');

  }
  
  render() {
    const {
      loggedInUser,
      removeArt,
      arts,
      login,
      logout,
      signup,
      updateUser,
      resetPassword,
    } = this.props;
    if (loggedInUser) {
      const userArts = arts
        ? arts.filter((art) => art.artist._id === loggedInUser._id)
        : [];
        
      // const ordersByUser = orders.filter(order => order.buyer.id === userId);
      // const ordersToUser = orders.filter(order => order.items.filter(item => item.artist.id === userId));
      // const userOrders = {ordersByUser,ordersToUser}
      const userOrders = loggedInUser.orders;

      return (
        <div className='account-page'>
          <UserDashboard
            user={loggedInUser}
            userArts={userArts}
            userOrders={userOrders}
            removeArt={removeArt}
            logout={logout}
            updateUser={updateUser}
            tab={this.props.match.params.tab}
            history={this.props.history}
          />
        </div>
      );
    } else
      return (
        <div className='account-page'>
          <LoginSignUpReset
            login={login}
            signup={signup}
            history={this.props.history}
            tab={this.props.match.params.tab}
            resetPassword={resetPassword}
          />
        </div>
      );
  }
}

function mapStateToProps({ userModule, artModule }) {
  return {
    loggedInUser: userModule.loggedInUser,
    arts: artModule.arts,
    // users: userModule.users,
    // orders: orderModule.orders,
  };
}
const mapDispatchToProps = {
  loadLoggedInUser,
  login,
  signup,
  logout,
  updateUser,
  resetPassword,
  removeArt,
  loadArts,
  // loadUsers
};
export const Account = connect(mapStateToProps, mapDispatchToProps)(_Account);
