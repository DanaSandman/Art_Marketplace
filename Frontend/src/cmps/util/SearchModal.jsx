import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { filterArt } from "../../store/art/art.action.js";

import { MobileTable } from "../user/dashboard/tables/MobileTable.jsx";
import { DesktopTable } from "../user/dashboard/tables/DesktopTable.jsx";

import { IconButton, Modal, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class _SearchModal extends Component {
  state = {
    search: "",
    isMobileView: true,
  };

  componentDidMount() {
    // check if desktop or mobile
    this.setResponsiveness();
    window.addEventListener('resize', () => this.setResponsiveness());
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setResponsiveness());
  }
  setResponsiveness = () => {
    return window.innerWidth < 900
      ? this.setState({ isMobileView: true })
      : this.setState({ isMobileView: false });
  };
  handleChange = ({ target }) => {
    // event.preventDefault();
    const value = target.value;
    this.setState({ search: value }, this.filter);
  };
  filter = () => {
    // ev.preventDefault();
    this.props.filterArt(this.state);
  };
  close = () => {
    this.setState({ search: "" }, () => this.props.closeSearch());
  };
  getDesktopTable = () => {
    const columns = [
      "Thumbnail",
      "Title",
      "Artist",
      "Category",
      "Material",
      "Technique",
      "Style",
      "Size",
      "Color",
      "Price",
    ];
    const data = this.props.arts.map((art) => {
      return {
        details: [
          <Link to={`/art/${art._id}`}>
            <img
              onClick={this.close}
              className="art-img-search"
              src={art.imgUrl}
            />
          </Link>,
          art.title,
          art.artist.fullname,
          art.category,
          art.material,
          art.technique,
          art.style,
          `${art.size.height}x${art.size.width} cm`,
          art.color,
          `${art.price} $`,
        ],
      };
    });
    return { columns, data };
  };
  getMobileTable = () => {
    const columns = [
      "Title",
      "Thumbnail",
      "Artist",
      "Category",
      "Material",
      "Technique",
      "Style",
      "Size",
      "Color",
      "Price",
    ];
    const data = this.props.arts.map((art) => {
      const details = [
        art.title,
        <Link to={`/art/${art._id}`}>
        <img
          onClick={this.close}
          className="art-img"
          src={art.imgUrl}
        />
        </Link>,
        art.artist.fullname,
        art.category,
        art.material,
        art.technique,
        art.style,
        `${art.size.height}x${art.size.width} cm`,
        art.color,
        `${art.price} $`,
      ];
      const btns = [
        ""
      ];
      return { details, btns };
    });
    return { columns, data };
  };
  render() {
    const { isOpen } = this.props;
    const { search , isMobileView } = this.state;
    return (
      <div className="search-modal">
        <Modal open={isOpen} onClose={this.close} aria-describedby="modal">
          <div id="modal" className="modal">
            <IconButton onClick={this.close} className="close-search-modal-btn">
              <CloseIcon />
            </IconButton>
            <div className="modal-content">
              <TextField
                label="Search"
                name="search"
                value={search}
                autoFocus
                onChange={this.handleChange}
                className="search-input"
                inputProps={{
                  autocomplete: "off",
                }}
              />
              {this.state.search !== "" && (
                  <section className="tables">
                    {isMobileView ? (
                      <MobileTable
                        table={this.getMobileTable()}
                        emptyTxt="No items found."/>               
                    ) : (
                    // <div className="search-table">
                      <DesktopTable
                        table={this.getDesktopTable()}
                        emptyTxt="No items found."/>)}
                         {/* </div>)}           */}
                    </section>)}

              {this.state.search === "" && <h4>Browse Artworks</h4>}
              <section className="quick-search-links">
                <Link to={`/category/Print`}>
                  <span onClick={this.close}>PRINTS</span>
                </Link>{" "}
                |{" "}
                <Link to={`/category/Photograph`}>
                  <span onClick={this.close}>PHOTOGRAPHS</span>
                </Link>{" "}
                |{" "}
                <Link to={`/category/Limited Edition Print`}>
                  <span onClick={this.close}>LIMITED EDITION PRINTS</span>
                </Link>{" "}
                |{" "}
                <Link to={`/category/Painting`}>
                  <span onClick={this.close}>PAINTING</span>
                </Link>{" "}
                |{" "}
                <Link to="#">
                  <span onClick={this.close}>PASTELS</span>
                </Link>{" "}
                |{" "}
                <Link to={`/category/Colorful`}>
                  <span onClick={this.close}>COLORFUL</span>
                </Link>
              </section>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    arts: state.artModule.arts,
  };
};
const mapDispatchToProps = {
  filterArt,
};
export const SearchModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SearchModal);
