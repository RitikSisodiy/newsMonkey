import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import dateFormat from 'dateformat';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    apiurl = "https://newsapi.org/v2/"
    apikey = this.props.apikey
    apiurl1 = 'https://saurav.tech/NewsAPI/'
    genUrl = (apiurl,country,category,page,apikey,pageSize) =>{
        if (apiurl === this.apiurl){
        return `${apiurl}top-headlines?country=${country}&category=${category}&apiKey=${this.apikey}&page=${page}&pageSize=${pageSize}`
        }
        if (apiurl===this.apiurl1){
        return `${apiurl}top-headlines?country=${country}&category=${category}&apiKey=${this.apikey}&page=${page}&pageSize=${pageSize}`
        }
    }
    articals = []
    constructor(props){
        super(props)
        this.state = {
            articals:this.articals,
            loading : false,
            page : 1
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`
        console.log("hello i am contructure from news component")
    }
    async updateNews(){
        this.props.setProgress(10)
        let url = `${this.apiurl}top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apikey}&pageSize=12&page=${this.state.page}`
        this.setState({loading:true})
        let data = await fetch(url)
        this.props.setProgress(30)
        let parseData = await data.json()
        this.props.setProgress(60)
        console.log(parseData)
        this.setState({loading:false,articals:parseData.articles,totalResult:parseData.totalResults})
        this.props.setProgress(100)
    }
   
    async componentDidMount(){
        // let url = `${this.apiurl}top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apikey}&pageSize=12`
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let parseData = await data.json()
        // console.log(parseData)
        // this.setState({loading:false,articals:parseData.articles,totalResult:parseData.totalResults})
        this.setState({page:this.state.page})
        this.updateNews()
    }
    handleNext = async () => {
        
        // let url = `${this.apiurl}top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apikey}&page=${this.state.page+1}&pageSize=12`
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let parseData = await data.json()
        // this.setState({loading:false,articals:parseData.articles,page:this.state.page+1,totalResult:parseData.totalResults})
        this.setState({page:this.state.page+1})
        this.updateNews()
    }
    handlePrevious = async () => {
        // let url = `${this.apiurl}top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apikey}&page=${this.state.page-1}&pageSize=12`
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let parseData = await data.json()
        // this.setState({loading:false,articals:parseData.articles,page:this.state.page-1,totalResult:parseData.totalResults})     
        this.setState({page:this.state.page-1})
        this.updateNews()  
    }
    handlePage = async (i) => {
        // let url = `${this.apiurl}top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apikey}&page=${i}&pageSize=12`
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let parseData = await data.json()
        // this.setState({articals:parseData.articles,page:i,totalResult:parseData.totalResults,loading:false})       
        this.setState({page:i})
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({
            page:this.state.page+1,
        })
        let url = `${this.apiurl}top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apikey}&pageSize=12&page=${this.state.page}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parseData = await data.json()
        console.log(parseData)
        this.setState({loading:false,articals:this.state.articals.concat(parseData.articles),totalResult:parseData.totalResults})
      };
    render() {
        var pagination = [];
        for (var i = 1; i <= Math.ceil(this.state.totalResult/12); i++) {
            pagination.push(<li key={i} className={this.state.page===i?"page-item active":"page-item"}><button className="page-link" onClick={this.handlePage.bind(this,i)}>{i}</button></li>);
        }
        return (
            <div className='container my-5'>
                <div>
                    <h1 className="my-4"></h1>
                    <h1 className='text-center'>NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
                </div>
                {this.state.loading && <Spinner />}
                    <InfiniteScroll
                    dataLength={this.state.articals.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articals.length<this.state.totalResult}
                    loader={<Spinner/>}>
                <div className="row my-4">
                    {/* {!this.state.loading && this.state.articals.map((element)=>{
                        return element?(
                            <div key={element.url} className="col-md-3">
                                <NewsItem  title={element.title?element.title.slice(0,45):""} discription={element.content?element.content.slice(0,85):""+"..."} date={dateFormat(element.publishedAt, "mmmm dS, yyyy")} src={element.urlToImage?element.urlToImage:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"} newsUrl={element.url?element.url:""} author={element.author?element.author:''} source={element.source.name} />
                            </div>
                        ):" "
                    })} */}
                    {this.state.articals.map((element)=>{
                        return element?(
                            <div key={element.url} className="col-md-3">
                                <NewsItem  title={element.title?element.title.slice(0,45):""} discription={element.content?element.content.slice(0,85):""+"..."} date={dateFormat(element.publishedAt, "mmmm dS, yyyy")} src={element.urlToImage?element.urlToImage:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"} newsUrl={element.url?element.url:""} author={element.author?element.author:''} source={element.source.name} />
                            </div>
                        ):" "
                    })}
                </div>
                    </InfiniteScroll>
                <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={(this.state.page<=1)?"page-item disabled":"page-item"}>
                    <button className="page-link"  disabled={this.state.page<=1} onClick={this.handlePrevious.bind(i)} >Previous</button>
                    </li>
                    
                    {pagination}

                    <li className={(Math.ceil(this.state.totalResult/12) <= this.state.page)?"page-item disabled":"page-item"}>
                    <button className="page-link"  disabled={(Math.ceil(this.state.totalResult/12) <= this.state.page)}  onClick={this.handleNext} >Next</button>
                    </li>
                </ul>
                </nav>
                </div>
            </div>
        )
    }
}

export default News
