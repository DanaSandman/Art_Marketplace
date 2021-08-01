import React, { Component } from 'react';
import { UserArts } from './UserArts.jsx';
import { UserOrders } from './UserOrders.jsx';
import { UserDetails } from './UserDetails.jsx';
import { artService } from '../../../services/art/art.service.js';
import { DesktopTabs } from './tabs/DesktopTabs.jsx';
import { MobileTabs } from './tabs/MobileTabs.jsx';

export class UserDashboard extends Component {
  state = {
    currTab: 'details',
    arts: [],
    isMobileView: false,
  };

  async componentDidMount() {
    // check if desktop or mobile
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? this.setState({ isMobileView: true })
        : this.setState({ isMobileView: false });
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());

    // check current tab
    this.props.history.push(`/account/${this.state.currTab}`);
    const { tab } = this.props;
    if (tab && this.tabs.includes(tab)) {
      this.setCurrTab(tab);
    }
    await this.setArts();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setResponsiveness());
  }

  setArts = async () => {
    const arts = [];
    await this.props.userOrders.forEach(async (order) => {
      const art = await artService.getById(order.artId);
      arts.push(art);
    });
    this.setState({ arts });
  };

  setCurrTab = (tab) => {
    if (tab === 'logout') {
      // logout & set tab to default
      this.props.logout();
      tab = 'details';
    }
    this.setState({ currTab: tab });
    this.props.history.push(`/account/${tab}`);
  };
  getCurrTab = () => {
    const { currTab, arts, isMobileView } = this.state;
    const { user, userArts, userOrders, removeArt, updateUser } = this.props;
    switch (currTab) {
      case 'details':
        return <UserDetails user={user} updateUser={updateUser} />;
      case 'arts':
        return (
          <UserArts
            arts={userArts}
            removeArt={removeArt}
            isMobileView={isMobileView}
          />
        );
      case 'orders':
        return <UserOrders arts={arts} isMobileView={isMobileView} />;
      default:
        return <UserDetails user={user} updateUser={updateUser} />;
    }
  };

  tabs = this.props.user.isArtist
    ? ['details', 'arts', 'orders', 'logout']
    : ['details', 'orders', 'logout'];

  render() {
    const { currTab, isMobileView } = this.state;
    return (
      <div className='user-dashboard'>
        <section className='tabs'>
          {isMobileView ? (
            <MobileTabs
              currTab={currTab}
              setCurrTab={this.setCurrTab}
              tabs={this.tabs}
            />
          ) : (
            <DesktopTabs
              currTab={currTab}
              setCurrTab={this.setCurrTab}
              tabs={this.tabs}
            />
          )}
        </section>
        <section className='tab-container'>{this.getCurrTab()}</section>
      </div>
    );
  }
}
