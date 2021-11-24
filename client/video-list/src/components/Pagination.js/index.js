import React from 'react'
import Pagination from "react-js-pagination";


class PaginationView extends React.Component {

    constructor(props){
        super(props)
        this.state={
            activePage:1
        }
    }

    handlePageChange(pageNumber) {
        // this.setState({activePage:pageNumber})
        this.props.onPageChange(pageNumber)
    }

    render() {
        return (
            <div className="pageNumber">
                <Pagination
                hideFirstLastPages={true}
                hideNavigation={true}	
                activePage={this.props.activePage}
                itemsCountPerPage={this.props.pageSize}
                totalItemsCount={this.props.totalcount} 
                pageRangeDisplayed={this.props.pageRange} 
                onChange={this.handlePageChange.bind(this)}
                />
            </div>
        )
    }
}

export default PaginationView
