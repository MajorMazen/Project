import React, { Component } from 'react';
import AuthService from '../network/AuthService'

class SignInForm extends Component {

    //instantiate public variable Auth
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loginSucces: false,
        }
        this.updateVal = this.updateVal.bind(this)
        this.submitForm = this.submitForm.bind(this)
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
            const response = await this.Auth.login(this.state.email, this.state.password);
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

    //add this componentWillMount method to prevent it staying on the login page after already having logged in
    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render() {
        return (

            <div className="SignInForm">

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <header className="card-header">
                                    <h4 className="card-title mt-2">Log in</h4>
                                </header>
                                <article className="card-body">
                                    <form onSubmit={this.submitForm}>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" name="email" onChange={this.updateVal} className="form-control" placeholder="" />
                                        </div>

                                        <div className="form-group">
                                            <label>Enter password</label>
                                            <input className="form-control" type="password" name="password" onChange={this.updateVal} />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block"> Log in  </button>
                                        </div>
                                    </form>
                                </article>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        );
    }
}

export default SignInForm;





