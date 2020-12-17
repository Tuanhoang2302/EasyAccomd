const initialState = {
    isDarkBackgroundMode: false, 
    user: null,
    chatTitle: null,
    roomChatId:null,
    contactId: null, 
    messageList: []
}


export default function appReducer(state = initialState, action){
    switch (action.type){
        case "CHANGE_BG_DARK_MODE": {
            return{
                ...initialState,
                isDarkBackgroundMode: true
            }  
        }
        case "CHANGE_BG_NORMAL_MODE": {
            return{
                ...initialState,
                isDarkBackgroundMode: false
            }  
        }
        case "LOGIN": {
            return{
                ...initialState,
                user: action.user
            }  
        }
        case "CHANGE_CHAT_TITLE": {
            return{
                ...initialState,
                user: action.data.user,
                chatTitle:action.data.chat_title
            }  
        }
        case "GET_ROOM_AND_CONTACTID": {
            return{
                ...initialState,
                user: action.data.user,
                chatTitle:action.data.chat_title,
                contactId: action.data.contactId,
                roomChatId: action.data.roomChatId
            }  
        }
        
        default:
            return initialState
    }
}