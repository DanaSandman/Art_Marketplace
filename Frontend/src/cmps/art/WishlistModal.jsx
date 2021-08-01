import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';


function getModalStyle() {

    return {
        top: 0,
        right: 0,
        

        //transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: '10px',
    },
}));
export function WishListModal({ selectedArt, saveWishItem }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

 
    const handleWish = () => {
        setOpen(true)
        saveWishItem(selectedArt)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-title-wish">This item has been added to youre Wishlist</div>
            <div id="simple-modal-description flex">
                <img className="img-wish" src={selectedArt.imgUrl} alt={selectedArt.imgUrl} />
                <p className="flex column">
                    <span>{selectedArt.title}</span>
                    <span>${selectedArt.price} </span>
                </p>
            </div>
            <button><Link to={`/wishlist`}>VIEW WISHLIST</Link></button>
            <Modal />
        </div>
    );

    return (
        <div>
            <a className="btn-wish-list" type="button" onClick={handleWish}>
                ♡ WISHLIST
            </a>
            <Modal
                open={open}
                onClick={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
