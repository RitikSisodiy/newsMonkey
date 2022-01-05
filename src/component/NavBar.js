import React, { Component} from 'react'
import {  NavLink} from 'react-router-dom'
export class NavBar extends Component {
    static propTypes = {

    }
    constructor(){
        super()
        this.state = {
            search:''
        }
    }
    handleOnchage = (event) =>{
        this.setState({search:event.target.value})
    }
    render() {
        return (
            <div className='container'>
           <nav className="navbar navbar-dark bg-warning fixed-top">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">{this.props.title}</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{this.props.title}</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body bg-warning">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName='active' aria-current="page" to="/">Home</NavLink>
          </li>
          {this.props.category.map((element,index)=>{
              return(
                <li key={index} className="nav-item"><NavLink activeClassName="active" className="nav-link" to={"/"+element}>{element}</NavLink></li>
              )
          })}
         </ul>
        <div className="d-flex">
          <input className="form-control me-2" type="search" onChange={this.handleOnchage} value={this.search} placeholder="Search" aria-label="Search" />
          <NavLink className="btn btn-outline-success" to="/search" onClick={this.props.search.bind(this,this.state.search)} type="submit">Search</NavLink>
        </div>
      </div>
    </div>
  </div>
</nav>
</div>


        )
    }
}

export default NavBar
