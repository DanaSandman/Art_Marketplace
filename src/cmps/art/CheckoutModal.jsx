import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';



function getModalStyle() {

    return {
        top: 150,
        right: 800,
        //transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'fixed',
        width: 500,
        height:200,
        backgroundColor: 'white',
        border: '1px solid #3d4246',        
        boxShadow: theme.shadows[5],
        padding: '80px',
        textAlign:'center',
    },
}));

export function CheckoutModal({ onCheckOut }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckout = () => {
        setOpen(true)
        onCheckOut()
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-description">
                Order has been sent to the artist</h3>
        </div>
    );

    return (
        <div>
            <button type="button" onClick={handleCheckout} className="btn-add-to-bag">
            Complete Purchase
      </button>
            <Modal
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClick={handleClose}>
                {body}
            </Modal>
        </div>
    );
}