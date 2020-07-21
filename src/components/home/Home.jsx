import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import './home.css'
import {withRouter} from 'react-router-dom'

const AUTHCODE = 'code'

class home extends Component {
    state = { code: '' }

    
    handleButtonClick = (event) =>
    {
        if ( this.state.code !== '' && AUTHCODE === this.state.code)
        {
            this.props.history.push(`/chat?code=${this.state.code}`)  
        }

    }

    handleOnKeyPress = (event) => {
        if (event.key === 'Enter' && AUTHCODE === this.state.code)
        {
            this.props.history.push(`/chat?code=${this.state.code}`)    
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="center code-container">
                    <h4>Enter your class code here </h4>
                    <Input onChange={ event => this.setState({code: event.target.value})} onKeyPress={this.handleButtonClick}  value={this.state.code} className="input-code" type="text" placeholder="Enter the code here .."></Input>
                        <button className="enter-btn" onClick={this.handleButtonClick}  >Enter</button>
                </div>
            </div>
        )
    }
}

export default withRouter(home) 
