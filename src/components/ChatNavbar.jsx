import React ,{Component} from 'react'
import { Icon } from 'semantic-ui-react'

class ChatNavbar extends Component{

    state = {
        message: ''
    }


    submitMessage = (event) => {
        event.preventDefault()
        if (this.state.message)
        {
            this.props.handleSubmitMessage(this.state.message)
            this.setState({
                message: ""
            })
        }
    }

    render() {

        return (
            <div className="chatnav-container" style={{
                height: "10vh",
                maxWidth: "500px",
                background: "rgb(134, 133, 133)",
                textAlign: "center",
                position: "relative",
                bottom: "0px"

            }}>
                <div>
                    <form onSubmit={this.submitMessage}>
                        <div className="chatnav" style={{
                            display: "flex",
                            background: "rgb(167, 164, 164)",
                            height: "10vh",
                            maxWidth: "500px",
                            padding: "1rem",
                        
                            
                        }}>
                            <div style={{ flexGrow: "9" }}>
                                <input autoComplete="off" aria-autocomplete="none" value={this.state.message} type="text" className="typedMsg" id="messagetyped" placeholder="Type message here....." onChange={(event) => this.setState({ message: event.target.value })} />
                            </div>
                            <div style={{ flexGrow: "1" }}>
                                <button className="sendBtn" type="submit" ><Icon onClick={this.submitMessage} name="chevron circle right" size="big" color="pink" /></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default ChatNavbar
