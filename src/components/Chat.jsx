import React, {useState,useEffect } from 'react'
import ChatNavbar from './ChatNavbar'
import ChatBox from './ChatBox'
import { nanoid } from 'nanoid'
import scrollAuto from '../app/Scroll'
import openSocket from 'socket.io-client';

const ENDPOINT = 'https://jeechatapp.herokuapp.com'
let socket

// const messages = [{ messageType: "received-msg", messageContent: "this is ghghdhfgjdshgfh received by user" },
//         { messageType: "received-msg", messageContent: "this is message received by user" }]



const Chat = () => {
    const [messages,setMessages] = useState([])
        // [{ messageType: "received-msg", messageContent: "this is ghghdhfgjdshgfh received by user" },
        //     { messageType: "received-msg", messageContent: "this is message received by user" }])
    
    const [message, setMessage] = useState({messageContent:''})
    
    useEffect(() => {
        socket = openSocket(ENDPOINT)

        socket.emit('join', {}, (error) => {
           if(error) console.log(error) 
        })
        
        // return () => {
        //     socket.emit('disconnect')
        //     socket.off()
        // }
        
    },[ENDPOINT])
    

    useEffect(() => {

        socket.on('welcome-msg', (message) => {
            console.log("welcome message ")
            console.log( messages)
            setMessages((messages) => [...messages, { messageType: "welcome-msg",messageContent:''}])
        })
        
        socket.on('returnMsg', ({message}) => {
            console.log(typeof (message))
            const msg = message
            console.log(msg)
            setMessages((messages) => [...messages, { messageType: "send-msg", messageContent: msg }])


        })
        socket.on('joined-msg', (message) => {
            console.log( messages)
            console.log("join message ")
            setMessages((messages) => [...messages, { messageType: "join-msg", messageContent: ''}])
        })
      
      
        socket.on('sendToMsg', ({message}) => {
            console.log(typeof (message))
            const msg = message
            console.log(msg)
            setMessages((messages)=>[...messages, { messageType: "received-msg", messageContent: msg }])
        
        })

        socket.on('message', (message) => {
            setMessages((messages) => [...messages, { messageType: "leave-msg",messageContent:'' }])
        })
        
    },[])


    const handleSubmitMessage = (messageContent) => {
        setMessage({ messageContent: messageContent })
        // messages.map( message => console.log("works as " + message.messageContent))
        
        socket.emit('sendMessage', messageContent, ()=> setMessage(''))
        scrollAuto('chatting-msg')
    }

 

    

        return (
            <div style = {{maxWidth: "500px", margin:"0 auto"}}>
                <div className="head" style={{height: "10vh"}}><h3>Anonymous Chat Group<br/><p>BE SE Day</p></h3></div>
                <div className="chatting-msg" style={{
                    width: "100%",
                    height: "80vh",
                    backgroundImage: "url('/assets/chattingbackimg.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    paddingBottom: "50px"
                }}> 
                    {messages.map(messageObj => <ChatBox key={nanoid()} message={messageObj} /> )}
                    
                </div>
                
                <div className="chat-navbar" style={{maxWidth: "500px"}}>
                    <ChatNavbar handleSubmitMessage={handleSubmitMessage}/>
                </div>
            </div>
        )
    }

export default Chat
