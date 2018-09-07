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
            done: false,
            posting: false
        }
    }

    //fetch data
    componentWillMount = async () => {
        this.setState({
            done: false
        })
        await this.props.getPosts();

    }


    componentWillReceiveProps(nextProps) { //happens when actions dispatched make changes to state tree
        if (nextProps.error === true)
            //triggering re-render with an error
            this.setState({
                error: true,
                done: true
            })

        if (nextProps.posts !== this.props.posts)
            this.setState({
                done: true
            })

        if (nextProps.posting === true) {
            this.setState({
                posting: true
            })
        }
        else if (nextProps.posting === false) {
            this.setState({
                posting: false
            })
        }
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

                    {this.state.posting ? (
                        <div>
                            <div className="alert alert-info">
                                <strong>Posting on your profile ...</strong>
                            </div>
                        </div>) : null}

                    {postItems}
                </div>
            )
        }
        else if (this.state.posting) {
            return (<div>
                <div className="alert alert-info">
                    <strong>Posting on your profile ...</strong>
                </div>
            </div>)
        }
        else if (this.state.done) {
            return (<div className="Posts">You aren't following anyone yet! Explore latest posts <a href="/recent"> Here </a></div>)
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
    posting: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    error: state.posts.error,
    errormsg: state.posts.errormsg,
    posts: state.posts.posts,
    myfollowing: state.follow.myfollowing,
    posting: state.posts.posting,
});

export default connect(mapStateToProps, { getPosts })(Posts);

