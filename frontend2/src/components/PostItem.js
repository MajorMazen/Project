import React, { Component } from 'react';
import { delPost } from '../actions/postGetActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PostItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
        }
    }

    componentWillReceiveProps(nextProps) { //happens when actions dispatched make changes to state tree
        if (nextProps.error === true)
            //triggering re-render with an error
            this.setState({
                error: true
            })
    }

    delete = async () => {
        await this.props.delPost(this.props.post._id); //what if i don't await
    }

    render() {
        return (
            <div className="PostItem">

                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.props.errormsg}
                    </div>) : null}

                <h3><a href={this.props.post.linkurl} target="_blank"> {this.props.post.linktitle} </a></h3>
                <p><a href={"/user/" + this.props.post.userid} > {this.props.post.username} </a></p>
                <p>{this.props.post.date}</p>
                <button disabled={!this.props.delete} onClick={this.delete}> Delete </button>
            </div>
        );
    }
}

PostItem.propTypes = {
    delPost: PropTypes.func.isRequired,
    error: PropTypes.bool,
    errormsg: PropTypes.string,
};

const mapStateToProps = (state) => ({
    error: state.posts.error,
    errormsg: state.posts.errormsg,
});

export default connect(mapStateToProps, { delPost })(PostItem);



