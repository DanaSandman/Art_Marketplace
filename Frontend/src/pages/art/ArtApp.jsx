import { connect } from 'react-redux';
import React from 'react';
import { ArtList } from '../../cmps/art/ArtList.jsx';
import { loadArts } from '../../store/art/art.action.js';
import { loadUsers } from "../../store/user/user.action.js";

class _ArtApp extends React.Component {


  componentDidMount() {
    this.props.loadArts();
    this.props.loadUsers();
  }
  render() {
    const { arts } = this.props;
    return (
      <div>
        <div className='main-container'>
          <section className='art-container'>
            <main>
              <ArtList arts={arts} />
            </main>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ artModule }) {
  return {
    arts: artModule.arts,
  };
}

const mapDispatchToProps = {
  loadArts,
  loadUsers
};

export const ArtApp = connect(mapStateToProps, mapDispatchToProps)(_ArtApp);
