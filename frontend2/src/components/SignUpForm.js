import React, { Component } from 'react';
import { connect } from 'react-redux'
import { register } from '../actions/authActions'
import PropTypes from 'prop-types'

class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }

    updateVal = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = async (e) => {
        //prevent default bootstrap event handlers
        e.preventDefault();
        await this.props.register(this.state.name, this.state.email, this.state.password);//await on page to display error messages

    }

    componentWillReceiveProps(nextProps) { //happens when actions dispatched make changes to state tree
        //transfer or use new props  
        if (nextProps.error === false)
            this.props.history.push('/home');
        else
            //triggering re-render with an error
            this.setState({
                error: true
            })
    }

    render() {
        return (

            <div className="SignUpForm">

                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.props.errormsg}
                    </div>) : null}

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <header className="card-header">
                                    <a href="/login" className="float-right btn btn-outline-primary mt-1">Log in</a>
                                    <h4 className="card-title mt-2">Sign up</h4>
                                </header>
                                <article className="card-body">
                                    <form onSubmit={this.submitForm}>
                                        <div className="form-group">
                                            <label>User Name</label>
                                            <input type="name" name="name" onChange={this.updateVal} className="form-control" placeholder="" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" name="email" onChange={this.updateVal} className="form-control" placeholder="" />
                                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Create password</label>
                                            <input className="form-control" type="password" name="password" onChange={this.updateVal} />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block"> Register  </button>
                                        </div>
                                        <small className="text-muted">By clicking the 'Sign Up' button, you confirm that you accept our <br /> Terms of use and Privacy Policy.</small>
                                    </form>
                                </article>
                                <div className="border-top card-body text-center">Have an account? <a href="/login">Log In</a></div>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        );
    }
}


SignUpForm.propTypes = {
    register: PropTypes.func.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    error: PropTypes.bool,
    errormsg: PropTypes.string
};

const mapStateToProps = (state) => ({
    name: state.auth.name,
    email: state.auth.email,
    error: state.auth.error,
    errormsg: state.auth.errormsg
});

export default connect(mapStateToProps, { register })(SignUpForm);







