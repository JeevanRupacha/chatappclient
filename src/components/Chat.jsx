import React, {useState,useEffect } from 'react'
import ChatNavbar from './ChatNavbar'
import ChatBox from './ChatBox'
import { nanoid } from 'nanoid'
import scrollAuto from '../app/Scroll'
import openSocket from 'socket.io-client'
import { Icon } from 'semantic-ui-react'

const ENDPOINT = 'https://jeechatapp.herokuapp.com/'
// const ENDPOINT = 'http://localhost:8000/'
let socket


const Chat = () => {
    const [messages, setMessages] = useState([])
    const [spiner, setSpinner] = useState(true)
    const [message, setMessage] = useState({ messageContent: '' })

   
    useEffect(() => {
        scrollAuto('chatting-msg')
    })
    
    useEffect(() => {
        socket = openSocket(ENDPOINT)

        socket.emit('join', {}, (error) => {
           if(error) console.log(error) 
        })
        
    }, [ENDPOINT])
    

  

    useEffect(() => {

        socket.on('messages', ({ databaseMessages }) => {
            setSpinner(false)
            //TODO stop the spinning // data load finish 
            
            databaseMessages.forEach(element => {
                setMessages((messages) => [...messages,{messageContent: `${element.messageContent}`, messageType: "received-msg"}])
                
            })
            scrollAuto('chatting-msg')
        }
        )

        socket.on('welcome-msg', ({ }) => {
            setMessages((messages) => [...messages, { messageType: "welcome-msg" }])
        })
        
        socket.on('returnMsg', ({message}) => {
            const msg = message
            setMessages((messages) => [...messages, { messageType: "send-msg", messageContent: msg }])
            scrollAuto('chatting-msg')


        })
        socket.on('joined-msg', (message) => {
            setMessages((messages) => [...messages, { messageType: "join-msg", messageContent: ''}])
        })
      
      
        socket.on('sendToMsg', ({ message }) => {
            const msg = message
            setMessages((messages)=>[...messages, { messageType: "received-msg", messageContent: msg }])
        
        })


        /* I remove because the annoying leave message without actual leave of user */
        // socket.on('message', (message) => {
        //     setMessages((messages) => [...messages, { messageType: "leave-msg",messageContent:'' }])
        // })
        
    },[])


    const handleSubmitMessage = (messageContent) => {
        setMessage({ messageContent: messageContent })        
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
                {
                    (spiner) ?  
                    <div className="center"> 
                    <Icon loading name='spinner' color='red' size="huge" />
                    </div>  :
                    (messages.map(messageObj => <ChatBox key={nanoid()} message={messageObj} />))           
                    
                }
                    
                </div>
                
                <div className="chat-navbar" style={{maxWidth: "500px"}}>
                    <ChatNavbar handleSubmitMessage={handleSubmitMessage}/>
                </div>
            </div>
        )
    }

export default Chat
