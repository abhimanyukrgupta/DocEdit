import './DeleteAccount.css';
import { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import { logoutUser } from '../actions/user';
import { connect } from 'react-redux';
import axios from 'axios';

class DeleteAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModal: false
        };
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }
    toggleDeleteModal() {
        this.setState({
            deleteModal: !this.state.deleteModal
        });
    }
    async deleteAccount() {
        await axios.post('/user/delete', {
            email: this.props.email
        });
        this.props.logout();
    }
    render() {
        return (
            <Fragment>
                <div className="DeleteAccount Flex-Row">
                    <button className="DeleteAccount-Button" onClick={this.toggleDeleteModal}>
                        DELETE ACCOUNT
                    </button>
                </div>
                <Dialog
                    open={this.state.deleteModal}
                    onClose={this.toggleDeleteModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your account?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action is irreversible
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" className={"warning"} component="span" onClick={this.toggleDeleteModal} autofocus >
                            <CancelIcon /> Cancel
                        </Button>
                        <Button variant="contained" color="secondary" component="span" autofocus onClick={this.deleteAccount}>
                            <DeleteIcon />Delete Account
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    email: state.user.email
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);