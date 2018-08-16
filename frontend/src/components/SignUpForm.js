import React, { Component } from 'react';
import SignUp from '../network/SignUp'
import AuthService from '../network/AuthService'

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loginSucces: false
        }
        this.updateVal = this.updateVal.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.SignUp = new SignUp();//instance of class SignUp
        this.Auth = new AuthService(); //instance of class AuthService
    }

    //update state as keys are entered
    updateVal = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    //form submission event handler
    submitForm = async (e) => {
        //prevent default bootstrap event handlers
        e.preventDefault();

        try {
            //token set inside fn module
            const response = await this.SignUp.signup(this.state.name, this.state.email, this.state.password);
            console.log(response);
            console.log(this.Auth.loggedIn());
            this.setState({
                loginSucces: response.success
            })
        } catch (e) {
            this.setState({
                error: e.email
            })
        }
    }

    //add this componentWillMount method to prevent it staying on the signup page after already having signed up
    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    //render fn
    render() {
        return (
            //<div> {this.state.error && <ErrorBox msg={this.state.error} />}</div> //variable parenthesis
            <div className="SignUpForm">

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <header className="card-header">
                                    <a href="http://localhost:3000/login" className="float-right btn btn-outline-primary mt-1">Log in</a>
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
                                <div className="border-top card-body text-center">Have an account? <a href="http://localhost:3000/login">Log In</a></div>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        );
    }
}

export default SignUpForm;





