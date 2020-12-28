
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import body from './Body.module.css'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {change_chat_tile, get_current_contact, get_room_and_contactid} from '../../redux/action/action'

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT, {
    withCredentials: true,
});

const Title = () => {
    const user = useSelector((state) => state.user)
    const chatTitle = useSelector((state) => state.chatTitle)
    return(
        <div className={body.title_section}>
            <div className={body.inbox_list_title}>Nhắn tin</div>
            <div style={{fontWeight:"bold"}} className={body.chat_title}>{chatTitle}</div>
            <div className={body.detail_title}>Thông tin chi tiết</div>
        </div>
    )
}

const InboxList = (props) => {
    const [contactList, setContactList] = useState(null)
    const account = useSelector((state) => state.user)
    const [selectedRoomIndex, setSelectedRoomIndex] = useState(1)

    var dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
              'http://localhost:3001/getRoomChat',
              {params: {
                  accountId: account._id
              }}
            );
            await setContactList(result.data)
              console.log(result.data);
          };
          
        fetchData();
    }, [account])
    console.log(contactList);
    const changeRoomChat = (e, accountContact, roomid, index) => {
        setSelectedRoomIndex(index)
        dispatch(change_chat_tile({chat_title: accountContact.userId.fullname, user: account}))
        dispatch(get_room_and_contactid({
            chat_title: accountContact.userId.fullname,
            user: account,
            roomChatId: roomid,
            contactId: accountContact._id
        }))

        socket.emit("join room", roomid)
        props.fetchMessList(roomid)
    }
    return(
        <div className={body.inbox_list}>
            {contactList ? 
            <React.Fragment>
                {contactList.map((item, index) => {
                    var bgColor
                    if(index + 1 != selectedRoomIndex){
                        bgColor="white"
                    } else{
                        bgColor="#e6e6e6"
                    }
                    //{item.account.email}
                    return(
                        <div onClick={(e) => changeRoomChat(e, item.account, item.roomid, index + 1)}
                        key={item.roomId} style={{backgroundColor:bgColor}} className={body.contact_tile}>
                            <img src={item.accom.images[0]} alt='avatar'/>
                            <div style={{marginLeft:"15px"}}>
                                <div>{item.account.userId.fullname}</div>
                            </div>
                        </div>
                    )
                })}
            </React.Fragment>
            : null}
        </div>
    )
}

const Message = (props) => {
    const userName = useSelector((state) => state.user._id)
    var textAlign, textColor, textBgColor
    if(userName != props.senderId){
        textAlign = "left"
        textColor = "black"
        textBgColor = "#e8e8e8"
    } else{
        textAlign = "right"
        textColor = "white"
        textBgColor = "#1c8dff"
    }
    return(
        <div style={{textAlign:textAlign}}>
            <span style={{backgroundColor :textBgColor}} className={body.message}>
                <div style={{color:textColor}}>{props.message}</div>
            </span>
        </div>
    )
}

const ChatSection = (props) => {
    const [message, setMessage] = useState("")
    const senderId = useSelector((state) => state.user._id)
    const senderName = useSelector((state) => state.user.email)
    const roomId = useSelector((state) => state.roomChatId)
    const contactId = useSelector((state) => state.contactId)
    //const [messageList, setMessageList] = useState([])
    const messageList = props.messageList
    useEffect(() => {
        const fetchData = async () => {
            await socket.on("server send message", (data) => {
                //setMessageList(state => [...state, data])
                if(data.message != ""){
                    props.setMessList(data)
                }
             });
          };
        fetchData();
    }, [ENDPOINT]);
    const handleEnter = async (e) => {
        if(e.key == "Enter"){
            await socket.emit("client send message", {
                message: message, 
                roomId: roomId,
                senderId: senderId,
                senderName: senderName,
                receiverId: contactId
            })
            setMessage("")
        }
    }
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    return(
        <div className={body.chat}>
            <div className={body.message_list}>
                {messageList.length > 0 ? 
                <React.Fragment>
                    {messageList.map((message) => {
                        return(
                            <Message message={message.message} 
                            senderId={message.senderId}
                            />
                        )
                    })}
                </React.Fragment>
                :null}
            </div>
            
            <div style={{textAlign:"center"}}>
                <input onKeyDown={handleEnter}
                value={message}
                onChange={(e) => handleChange(e)}
                placeholder="Nhập tin nhắn" className={body.chat_bar}/>
            </div>
        </div>
    )
}

const Content = () => {
    const [messageList, setMessageList] = useState([])
    const setMessList = (message) => {
        setMessageList(state => [...state, message])
    }
    const resetMessList = (message) => {
        setMessageList([])
    }
    const fetchMessList = async (roomId) => {
        var result = await axios.get("http://localhost:3001/getPrevMessage", {
            params: {
                roomId: roomId
            }
        })
        var messList = []
        for(let i = 0; i < result.data.length; i++){
            var temp = {
                message: result.data[i].content,
                senderId: result.data[i].senderId
            }
            messList.push(temp)
        }
        setMessageList(messList)

    }
    
    return(
        <div className={body.main_section}>
            <InboxList messageList={messageList} resetMessList={resetMessList} 
            fetchMessList={fetchMessList}/>
            <ChatSection setMessList={setMessList} messageList={messageList}/>
            <div className={body.detail}></div>
        </div>
    )
}

const Body = () => {
    
    return (
        <div className={body.body}>
            <Title/>
            <Content/>
        </div>
    );
};

export default Body;