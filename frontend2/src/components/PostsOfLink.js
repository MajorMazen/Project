import React, { Component } from 'react';
import PostItem from './PostItem'
import PostGet from '../network/PostGet'
import AuthService from '../network/AuthService'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//Fetching posts - arbitrary url in the property
class PostsOfLink extends Component {

    constructor(props) {
        super(props);

        this.AuthService = new AuthService();
        this.PostGet = new PostGet();
        this.domain = 'http://localhost:5000/posts';
        const dat = this.AuthService.getUserInfo();

        //set to router link if no props are passed through another component
        let url;
        if (!this.props.url) { url = this.props.match.url; }
        else url = this.props.url;

        this.state = {
            error: false,
            errormsg: "",
            posts: [],
            id: dat.id,
            url: url
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    //fetch data
    componentDidMount = async () => {
        try {
            const data = await this.PostGet.safeGet(this.domain + this.state.url);//like /topic/ or /user/

            this.setState({
                error: false,
                posts: data
            })
        }
        catch (e) {
            this.setState({
                error: true,
                errormsg: "Fetch error"
            })
        }

    }

    componentWillReceiveProps(nextProps) { //happens when actions dispatched make changes to state tree

        if (nextProps.delpostid !== this.props.delpostid) {
            let i = this.state.posts.findIndex(post => post._id === nextProps.delpostid);
            if (i > -1) {
                this.state.posts.splice(i, 1);
            }
        }
    }

    render() {

        //calling postitems component, delete depends
        if (this.state.posts.length > 0) {
            const postItems = this.state.posts.map(post => (
                <PostItem post={post} key={post._id} delete={(post.userid === this.state.id)} />
            ));

            //printing any errors and postitems
            return (
                <div className="PostsOfLink">
                    {this.state.error ? (
                        <div className="alert alert-danger" role="alert">
                            {this.state.errormsg}
                        </div>) : null}

                    <div className="Navigation">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div><Link to="/">Back to Home</Link></div>
                        </nav>
                    </div>

                    {postItems}
                </div>
            )
        }

        else {
            return (<div className="PostsOfLink">
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.errormsg}
                    </div>) : null}
            </div>)
        }
    }
}


PostsOfLink.propTypes = {
    delpostid: PropTypes.string,//senses deletion actions
};

const mapStateToProps = (state) => ({
    delpostid: state.posts.delpostid
});

export default connect(mapStateToProps)(PostsOfLink);



