import React from 'react'
import axios from 'axios';

class ActionButton extends React.Component {

  constructor(props){
    super(props)
    this.state={
      imageUrl:"",
      disable: true,
      sizeError:""
    }
  }

 uploadImage = (e)=>{
      const fileSize = e.target.files[0].size
      const maxSize = 50 * 1024 * 1024

      this.setState({imageUrl:e.target.files[0].name, sizeError:"", disable:false})

      if(fileSize >= maxSize){
        this.setState({sizeError:"file size should not exceed 50mb",disable:true})
      }
  }

  submit = ()=>{
    const {imageUrl} = this.state
    const file = document.getElementById('upload');
    file.value = '';
    this.setState({disable:true})
    const postData = new FormData();
    postData.append('image', imageUrl);

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: postData,
      url:'http://localhost:4500/user/image-upload'
     };
    

    axios(options)
    .then(res => {
        if(res.status === 200){
           this.props.getVideoList()
           this.props.setActivePage()
        }
    })
  }


  render() {

    const {sizeError,disable} = this.state

    return (
      <>
          <div className="buttons-grid">
              <input type="file" id="upload" name="myImage" accept="video/mp4,video/x-m4v,video/*" onChange={(e)=>this.uploadImage(e)} />
              <button type="button" className="btn btn-primary" disabled={disable} onClick={this.submit}> Submit </button>
          </div>

          { sizeError && <span className="error">{sizeError}</span>}
    </>

    )
  }
}

export default ActionButton
