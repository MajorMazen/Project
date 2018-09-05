import React, { Component } from 'react';
import { newPost } from '../actions/postGetActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PostLinkForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newpost_error: false
        }
    }
    updateVal = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm = async (e) => {
        e.preventDefault();
        try {
            await this.props.newPost(this.state.urlParam);
            this.setState({
                newpost_error: false,
            })
        }
        catch (e) {
            this.setState({
                newpost_error: true,
            })
        }
    }

    //--------------------------------------------------------------------------------------------------
    render() {
        return (
            <div className="PostLinkForm bg-dark" style={divStyle}>

                {this.state.newpost_error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.props.errormsg}
                    </div>) : null}

                <form onSubmit={this.submitForm}>
                    <div className="form-row align-items-center ">
                        <div className="col-sm-10">
                            <label className="sr-only" htmlFor="formUrlParam">URL</label>
                            <input type="url" className="form-control" name="urlParam" id="formUrlParam" placeholder="http://www.website.com" required={true} onChange={this.updateVal} />
                        </div>
                        <div className="col-sm-2">
                            <button type="submit" className="btn btn-primary btn-lg btn-submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

PostLinkForm.propTypes = {
    newPost: PropTypes.func.isRequired,
    error: PropTypes.bool,
    errormsg: PropTypes.string,
};

const mapStateToProps = (state) => ({
    error: state.posts.error,
    errormsg: state.posts.errormsg,
});

export default connect(mapStateToProps, { newPost })(PostLinkForm);

const divStyle = {
    position: "fixed",
    bottom: "0%",
    width: "100%",
}

