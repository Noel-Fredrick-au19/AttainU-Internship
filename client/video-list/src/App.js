
import React from 'react'
import axios from 'axios';
import ActionButton  from './components/ActionButton.js';
import VideoList from './components/VideosList.js';
import PaginationView from './components/Pagination.js';



class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
        videoList:[],
        pageRange:0,
        totalcount:0,
        pageSize:2,
        currentPage:1,
        activePage:1
    }
  }

  componentDidMount() {
    this.getVideoList();
  }

  getVideoList = (pageSize=2,currentPage=1)=>{
      axios.get(`http://localhost:4500/user/videoList`,{
        params: {
          pageSize: pageSize,
          currentPage:currentPage
        }
      })
      .then(res => {
        const videoList = res.data.result;
        const totalcount = res.data.totalcount
        const pageRange = res.data.pages
        this.setState({ videoList , totalcount,pageRange });
      })
  }

  onPageChange = (currentPage)=>{
    const {pageSize} = this.state
    this.setState({activePage:currentPage})
    this.getVideoList(pageSize,currentPage)
  }

  setActivePage = ()=>{
    this.setState({activePage:1})
  }


  
  render(){
    const {videoList,pageSize,currentPage,pageRange,totalcount,activePage} = this.state
    return (
      <div className="App">
         <ActionButton getVideoList={this.getVideoList} setActivePage={this.setActivePage}/>
         { videoList.length > 0 && <VideoList videoList={videoList}/>}
         <PaginationView activePage={activePage} videoList={videoList} pageRange={pageRange} totalcount={totalcount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.onPageChange}/>
      </div>
    )
  }

  
}

export default App;
