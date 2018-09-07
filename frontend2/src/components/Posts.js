import React, { Component } from 'react';
import PostItem from './PostItem'
import { getPosts } from '../actions/postGetActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            done: false
        }
    }

    //fetch data
    componentWillMount = async () => {
        this.setState({
            done: false
        })
        await this.props.getPosts();
        this.setState({
            done: true
        })
    }


    componentWillReceiveProps(nextProps) { //happens when actions dispatched make changes to state tree
        if (nextProps.error === true)
            //triggering re-render with an error
            this.setState({
                error: true
            })

    }

    render() {
        //calling postitems component, delete enabled
        if (this.props.posts.length > 0) {
            const postItems = this.props.posts.map(post => (
                <PostItem post={post} key={post._id} delete={false} />
            ));

            //printing any errors and postitems
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
        else if (this.state.done) {
            return (<div className="Posts">Nothing to display</div>)
        }

        else {
            return (
                <div className="Posts">
                    {this.state.error ? (
                        <div className="alert alert-danger" role="alert">
                            {this.props.errormsg}
                        </div>) : null}
                </div>
            )
        }
    }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    error: PropTypes.bool,
    errormsg: PropTypes.string,
    posts: PropTypes.array,
    myfollowing: PropTypes.array,
};

const mapStateToProps = (state) => ({
    error: state.posts.error,
    errormsg: state.posts.errormsg,
    posts: state.posts.posts,
    myfollowing: state.follow.myfollowing,
});

export default connect(mapStateToProps, { getPosts })(Posts);

