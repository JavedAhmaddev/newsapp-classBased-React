import React, { Component } from 'react'
import download from '../src/download.jpg'

export class Newsitem extends Component {


  render() {

    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className=" container my-3">
        <div className="card" >
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
          <img src={imageUrl ? imageUrl : {download}} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small style={{color: "colorvoilet"}}>By <strong>{!author ? "Unknown" : author} </strong> on <strong> {new Date(date).toLocaleString()} </strong></small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>

      </div>
    )
  }
}

export default Newsitem
