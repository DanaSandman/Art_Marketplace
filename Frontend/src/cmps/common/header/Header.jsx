import React from 'react';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

export class Header extends React.Component {
  state = {
    isMobileView: false,
  };

  componentDidMount() {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? this.setState({ isMobileView: true })
        : this.setState({ isMobileView: false });
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setResponsiveness());
  }

  render() {
    const { isMobileView } = this.state;
    return isMobileView ? <MobileNav /> : <DesktopNav />;
  }
}
