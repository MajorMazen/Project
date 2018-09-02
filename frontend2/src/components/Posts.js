import React, { Component } from 'react';
import PostItem from './PostItem'
import { getPosts } from '../actions/postGetActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }

    //fetch data
    componentWillMount = async () => {
        await this.props.getPosts(); //test using the fn in place of action
    }


    componentWillReceiveProps(nextProps) { //happens when actions dispatched make changes to state tree
        if (nextProps.error === true)
            //triggering re-render with an error
            this.setState({
                error: true
            })

    }


    render() {

        if (this.props.posts.length > 0) {
            const postItems = this.props.posts.map(post => (
                <PostItem post={post} key={post._id} delete={false} />
            ));

            return (
                <div className="Posts">
                    {this.state.error ? (
                        <div className="alert alert-danger" role="alert">
                            {this.props.errormsg}
                        </div>) : null}
                    {postItems}
                </div>
            )
        }

        else {
            return (<div className="Posts">
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.props.errormsg}
                    </div>) : null}
            </div>)
        }
    }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    error: PropTypes.bool,
    errormsg: PropTypes.string,
    posts: PropTypes.array,
};

const mapStateToProps = (state) => ({
    error: state.posts.error,
    errormsg: state.posts.errormsg,
    posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);

