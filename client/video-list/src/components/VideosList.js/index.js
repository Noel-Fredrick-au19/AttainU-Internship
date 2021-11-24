import React from 'react'


class VideoList extends React.Component {

  render() {

    const {videoList} = this.props

    return (
      <div className="video-links">
          {videoList.map((item, index) => (
              <li key={index}>
                      <a href={item.image}>{item.image}</a>
              </li>
            
          ))
         }
      </div>
    )
  }
}

export default VideoList
