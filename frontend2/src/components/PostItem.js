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
        await this.props.delPost(this.props.post._id);
    }

    render() {
        return (
            <div className="PostItem">

                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.props.errormsg}
                    </div>) : null}

                <div class="card w-100">
                    <div class="card-body row">
                        <h5 class="card-title col-sm-2"><a href={"/user/" + this.props.post.userid} > {this.props.post.username} </a></h5>
                        <div class="col-sm-9">
                            <h4 class="card-text"><a href={this.props.post.linkurl} target="_blank"> {this.props.post.linktitle} </a></h4>
                            <p class="card-subtitle text-muted">{this.props.post.date}</p>
                            <a href="" class="card-link">Card link</a>
                            <a href="" class="card-link">Another link</a>
                        </div>
                        <div class="col-sm-1">
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
    error: PropTypes.bool,
    errormsg: PropTypes.string,
};

const mapStateToProps = (state) => ({
    error: state.posts.error,
    errormsg: state.posts.errormsg,
});

export default connect(mapStateToProps, { delPost })(PostItem);



