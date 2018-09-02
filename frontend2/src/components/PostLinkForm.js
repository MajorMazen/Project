// import React, { Component } from 'react';
// import PostGet from '../network/PostGet'

// class PostLinkForm extends Component {
//     //--------------------------------------------------------------------------------------------------
//     updateVal = (e) => {
//         this.setState({ [e.target.name]: e.target.value })
//     }

//     submitForm = async (e) => {
//         e.preventDefault();
//         try {
//             let postdetails = await this.PostGet.postLink('http://localhost:5000/post/', this.state.urlParam);
//             let data = await this.PostGet.safeGet('http://localhost:5000/posts/' + postid);

//             this.setState({
//                 success: true,
//                 posts: data,
//             }, function () {
//                 this.props.addPost(this.postdetails); //triggering handleFollowId on App component
//             })
//         }
//         catch (e) {
//             this.setState({
//                 success: false,
//             })
//         }
//     }

//     //--------------------------------------------------------------------------------------------------
//     render() {
//         return (
//             <div className="PostLinkForm">
//                 <form onSubmit={this.submitForm}>
//                     <div class="form-row align-items-center ">
//                         <div class="col-sm-10">
//                             <label class="sr-only" for="formUrlParam">URL</label>
//                             <input type="url" class="form-control" name="urlParam" id="formUrlParam" placeholder="http://www.website.com" value="" required="" onChange={this.updateVal} />
//                         </div>
//                         <div class="col-sm-2">
//                             <button type="submit" class="btn btn-primary btn-lg btn-submit">Post</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>

//         );
//     }
// }

// export default PostLinkForm;
