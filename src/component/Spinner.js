import React, { Component } from 'react'
import loading from "./spinner.gif"
export class Spinner extends Component {
    render() {
        return (
            <div className='text-center' >
                <img src={loading} alt="loading" style={{width:"5%"}} />
            </div>
        )
    }
}

export default Spinner
