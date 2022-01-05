import React, { Component } from 'react'

export class NewsItem extends Component {
 
    render() {
        let {title,discription , src,newsUrl,date,author,source} = this.props
        return (
            <div>
            <div className="card" >
            <div className='d-flex flex-row-reverse bd-highlight'>
                <span className="position-absolute top-0 badge rounded-pill bg-danger">
                    {source}  
                </span>
            </div>
                <img src={src} className="card-img-top" alt="..." style={{height:"168px",objectFit: "cover"}} />
                <div className="card-body">
                    <span></span>
                    <p className="card-text"><small className="text-muted"><strong  className='text-success'>Published: By {author?author:"UnKnown"} on </strong>{date}</small></p>
                    <h5 className="card-title">{title}
                  
                    </h5>
                    <p className="card-text">{discription}</p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-warning">Read More</a>
                </div>
            </div>
            </div>
        )
    }
}

export default NewsItem
