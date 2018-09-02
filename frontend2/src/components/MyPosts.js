import React, { Component } from 'react';
import PostItem from './PostItem'
import { getMyPosts } from '../actions/postGetActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class MyPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }

    //fetch data
    componentWillMount = async () => {
        await this.props.getMyPosts();
    }


    componentWillReceiveProps(nextProps) { //happens when actions dispatched make changes to state tree
        if (nextProps.error === true)
            //triggering re-render with an error
            this.setState({
                error: true
            })

    }


    render() {

        if (this.props.myposts.length > 0) {
            const postItems = this.props.myposts.map(mypost => (
                <PostItem post={mypost} key={mypost._id} delete={true} />
            ));

            return (
                <div className="MyPosts">
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

MyPosts.propTypes = {
    getMyPosts: PropTypes.func.isRequired,
    error: PropTypes.bool,
    errormsg: PropTypes.string,
    myposts: PropTypes.array,
};

const mapStateToProps = (state) => ({
    error: state.posts.error,
    errormsg: state.posts.errormsg,
    myposts: state.posts.myposts,
});

export default connect(mapStateToProps, { getMyPosts })(MyPosts);

