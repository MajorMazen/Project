import React, { Component } from 'react';
import { delPost } from '../actions/postGetActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import user from '../img/user.jpg'

class PostItem extends Component {

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
            <div className="PostItem" >

                <div className="card w-100" >
                    <div className="card-body row">
                        <h5 className="card-title col-sm-2"><a href={"/user/" + this.props.post.userid} >
                            <img src={user} width="70" height="70" className="d-inline-block align-top" alt="" />
                            <br />
                            {this.props.post.username} </a></h5>
                        <div className="col-sm-9">
                            <h4 className="card-text"><a href={this.props.post.linkurl} target="_blank"> {this.props.post.linktitle} </a></h4>
                            <p className="card-subtitle text-muted">{this.props.post.date}</p>
                            {linkTopics}
                        </div>
                        <div className="col-sm-1">
                            <button className="btn btn-secondary" disabled={!this.props.delete} onClick={this.delete}> X </button>
                            <br /><br /><br />
                            <a href={"/post/" + this.props.post._id}>View</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    delPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { delPost })(PostItem);



