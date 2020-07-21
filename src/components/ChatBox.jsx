import React, { Component } from 'react'

class ChatBox extends Component {
    state = {
        message: ""
    }
    render() {
        const { messageType, messageContent } = this.props.message
    return (
        
        <div>
            {messageType === "received-msg" &&
                <div className="received-msg clearfix">
                    <div className="profile"></div>
                    <div className="text-msg">{messageContent}</div>
                </div>
            }   
            
            { messageType === "send-msg" &&
            <div className="send-msg clearfix">
                <div className="text-msg">{messageContent}</div>
            </div>
            }

            {messageType === "welcome-msg" &&
                <p style={{
                    textAlign: "center", color: "rgba(224, 121, 121, 0.863)",fontSize: "1rem",fontStyle:"italic", margin: "5px"}}
                >Welcome to this Chat group</p>}
            
            { messageType === "join-msg" &&
                <div>
                    <div ><p style={{
                        display: "block", textAlign: "center", color: "rgba(224, 121, 121, 0.863)",fontSize: "1rem",fontStyle:"italic", margin: "5px"
                    }}>New user joined !</p></div>
                </div>
            }

            { messageType === "leave-msg" &&
            <div >
                <div><p style={{
                    textAlign: "center", color: "rgba(224, 121, 121, 0.863)",fontSize: "1rem",fontStyle:"italic", margin: "5px"
                }}>One uesr left </p></div>
            </div>
            }

        </div>
    )
    }
}

export default ChatBox
