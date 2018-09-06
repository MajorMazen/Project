import React, { Component } from 'react';
import { delPost } from '../actions/postGetActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PostItem extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         error: false,
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.error === true)
    //         //triggering re-render with an error
    //         this.setState({
    //             error: true
    //         })
    // }

    delete = async () => {
        await this.props.delPost(this.props.post._id);
    }

    render() {

        //adding post topics as links, href loads posts sharing same keyword
        let linkTopics; const key = this.props.post._id; let counter = 0;
        if (this.props.post.linktopics.length > 0) {
            linkTopics = this.props.post.linktopics.map(topic => (
                <a href={"/topic/" + topic} className="card-link" key={key + "_" + counter++}> {topic} </a>
            ));
        }
        else linkTopics = null;

        //rendering post card with delete 
        return (
            <div className="PostItem">
                {/* {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.props.errormsg}
                    </div>) : null} */}

                <div className="card w-100">
                    <div className="card-body row">
                        <h5 className="card-title col-sm-2"><a href={"/user/" + this.props.post.userid} > {this.props.post.username} </a></h5>
                        <div className="col-sm-9">
                            <h4 className="card-text"><a href={this.props.post.linkurl} target="_blank"> {this.props.post.linktitle} </a></h4>
                            <p className="card-subtitle text-muted">{this.props.post.date}</p>
                            {linkTopics}
                        </div>
                        <div className="col-sm-1">
                            <button className="btn btn-secondary" disabled={!this.props.delete} onClick={this.delete}> X </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    delPost: PropTypes.func.isRequired,
    // error: PropTypes.bool,
    //errormsg: PropTypes.string,
};

const mapStateToProps = (state) => ({
    //error: state.posts.error,
    //errormsg: state.posts.errormsg,
});

export default connect(mapStateToProps, { delPost })(PostItem);



