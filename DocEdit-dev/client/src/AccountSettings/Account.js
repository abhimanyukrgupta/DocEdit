import { fetchProfile } from "../actions/user";
import { Component, Fragment } from "react";
import Loading from "../Layouts/Loading";
import Navbar from "../Layouts/Navbar";
import { connect } from "react-redux";
import TwoFA from './TwoFA';
import "./Account.css";
import { setLoading, setLoaded } from "../actions/global";
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

class Editor extends Component {
    componentDidMount() {
        if (this.props.user.email === '') {
            this.props.setLoading();
            this.props.fetchProfile();
        }
    }
    render () {
        const { email, emailVerified } = this.props.user;
        const emailStatus = emailVerified ? 'Verified':'Unverified';
        return (
            <Fragment>
                {this.props.loading && <Loading />}
                <Navbar dashboard={true} />
                <div className="Account">
                    <h2 className="Account-email">Your email: {email}</h2>
                    <h2 className="Account-email">Email status: {emailStatus}</h2>
                    <TwoFA />
                    <UpdateEmail />
                    <UpdatePassword />
                    <DeleteAccount />
                    <div className="Empty288">
                    
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.global.loading,
        user: state.user
    };
};

const mapDispatchToProps = dispatch => ({
    fetchProfile: () => dispatch(fetchProfile()),
    setLoading: () => dispatch(setLoading()),
    setLoaded: () => dispatch(setLoaded())
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);