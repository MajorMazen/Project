import React, { Component } from 'react';
import { newPost } from '../actions/postGetActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PostLinkForm extends Component {

    updateVal = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm = async (e) => {
        e.preventDefault();
        await this.props.newPost(this.state.urlParam);

    }

    //--------------------------------------------------------------------------------------------------
    render() {
        return (
            <div className="PostLinkForm bg-dark" style={divStyle}>

                <form onSubmit={this.submitForm}>
                    <div className="form-row align-items-center ">
                        <div className="col-sm-11">
                            <label className="sr-only" htmlFor="formUrlParam">URL</label>
                            <input type="url" className="form-control" name="urlParam" id="formUrlParam" placeholder="http://www.website.com" defaultValue="" required={true} onChange={this.updateVal} />
                        </div>
                        <div className="col-sm-1">
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
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { newPost })(PostLinkForm);

const divStyle = {
    position: "fixed",
    bottom: "0%",
    width: "100%",
}

