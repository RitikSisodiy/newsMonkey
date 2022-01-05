import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import NavBar from './component/NavBar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API
  constructor(){
    super()
    this.state = {
      category : [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology"
      ],
      progress:0,
    }
    
    console.log("hello i am contructure from news component")
}

setProgress = (progress) =>{
  this.setState({progress:progress})
}
handleSearch = (qry) =>{
  this.setState({search:qry})
}

  render() {
    return (
      <div>
          <Router>
          <NavBar title="NewsMonkey" category={this.state.category} search={this.handleSearch} />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)} 
            height={4}
          />
          <Switch>
            
            <Route exact path="/">
              <News  country='in' category="technology" setProgress={this.setProgress} apikey={this.apikey}/>
            </Route>
            <Route exact path="/search">
              <News country='in' category="technology" setProgress={this.setProgress} search={this.state.search} apikey={this.apikey} />
            </Route>
            {this.state.category.map((element,index)=>{
              return(
                <Route exact key={index} path={"/"+element}>
                  <News country='in' category={element} setProgress={this.setProgress} apikey={this.apikey}/>
                </Route>
              )
            })}
            
          </Switch>
          </Router>
      </div>
    )
  }
}
