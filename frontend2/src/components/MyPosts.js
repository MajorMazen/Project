import React, { Component } from 'react';
import PostItem from './PostItem'
import { getMyPosts } from '../actions/postGetActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class MyPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            posting: false
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

        //actively adding or deleting myposts on actions call
        if (nextProps.newpost !== this.props.newpost) {
            this.props.myposts.unshift(nextProps.newpost);
        }

        if (nextProps.delpostid !== this.props.delpostid) {
            let i = this.props.myposts.findIndex(post => post._id === nextProps.delpostid);
            if (i > -1) {
                this.props.myposts.splice(i, 1);
            }
        }

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
        if (this.props.myposts.length > 0) {
            const postItems = this.props.myposts.map(mypost => (
                <PostItem post={mypost} key={mypost._id} delete={true} />
            ));

            //printing any errors and postitems
            return (
                <div className="MyPosts">
                    {this.state.error ? (
                        <div className="alert alert-danger" role="alert">
                            {this.props.errormsg}
                        </div>) : null}

                    {this.state.posting ? (
                        <div>
                            <div className="alert alert-info">
                                <strong>Posting Link ...</strong>
                            </div>
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
    newpost: PropTypes.object,
    delpostid: PropTypes.string,
    posting: PropTypes.bool
};

const mapStateToProps = (state) => ({
    error: state.posts.error,
    errormsg: state.posts.errormsg,
    myposts: state.posts.myposts,
    newpost: state.posts.newpost,
    delpostid: state.posts.delpostid,
    posting: state.posts.posting
});

export default connect(mapStateToProps, { getMyPosts })(MyPosts);

