import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class SignInForm extends Component {

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
        await this.props.login(this.state.email, this.state.password);//await on page to display error messages

    }

    //any changes to current state will activate re-rendering (this.props.mapped_var can be edited but never assigned (only through actions!)
    //props= nextprops at re-render
    componentWillReceiveProps(nextProps) { //happens when actions dispatched make changes to state tree
        //transfer or use new props  
        if (nextProps.error === false)
            this.props.history.push('/');

        else
            //triggering re-render with an error
            this.setState({
                error: true
            })
    }

    render() {
        return (

            <div className="SignInForm">
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.props.errormsg}
                    </div>) : null}

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <header className="card-header">
                                    <a href="/signup" className="float-right btn btn-outline-primary mt-1">Sign Up</a>
                                    <h4 className="card-title mt-2">Log In</h4>
                                </header>
                                <article className="card-body">
                                    <form onSubmit={this.submitForm}>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" name="email" onChange={this.updateVal} className="form-control" placeholder="" />
                                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Enter password</label>
                                            <input className="form-control" type="password" name="password" onChange={this.updateVal} />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block"> Log In  </button>
                                        </div>
                                    </form>
                                </article>
                                <div className="border-top card-body text-center">Don't have an account? <a href="/signup">Sign Up</a></div>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        );
    }
}

SignInForm.propTypes = {
    login: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { login })(SignInForm);







