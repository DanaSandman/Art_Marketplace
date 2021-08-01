import React, { Fragment } from "react";
import { connect } from "react-redux";

import { ArtList } from "../../cmps/art/ArtList.jsx";
import { loadArts } from "../../store/art/art.action.js";

export class _ArtByCategory extends React.Component {
  componentDidMount() {
    const { loadArts } = this.props;
    const category = this.props.match.params;
    loadArts(category);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params !== nextProps.match.params) {
      this.props.loadArts(nextProps.match.params);
    }
  }

  render() {
    return (
      <Fragment>
        <h1>By Category</h1>
        <ArtList arts={this.props.arts} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arts: state.artModule.arts,
  };
};

const mapDispatchToProps = {
  loadArts,
};
export const ArtByCategory = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ArtByCategory);
