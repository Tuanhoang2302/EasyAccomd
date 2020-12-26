const initialState = {
    isDarkBackgroundMode: false, 
    user: null,
    chatTitle: null,
    roomChatId:null,
    contactId: null,
    token: null,
    locationSearch: null,
    filterSearch: null
}


export default function appReducer(state = initialState, action){
    switch (action.type){
        case "CHANGE_BG_DARK_MODE": {
            return{
                ...action.existing,
                isDarkBackgroundMode: true
            }  
        }
        case "CHANGE_BG_NORMAL_MODE": {
            return{
                ...action.existing,
                isDarkBackgroundMode: false
            }  
        }
        case "LOGIN": {
            return{
                ...initialState,
                user: action.user, 
                token: action.token
            }  
        }
        case "LOGOUT": {
            return{
                initialState,
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
        case "GET_LOCATION_SEARCH": {
            return{
                ...action.existing,
                locationSearch: action.data,
            }  
        }
        case "REMOVE_ALL_SEARCH": {
            return{
                ...initialState,
                user: action.existing.user
            }  
        }
        case "GET_FILTER_SEARCH": {
            return{
                ...action.existing,
                filterSearch: action.data,
            }  
        }
        case "DELETE_PRICE_FILTER": {
            return{
                ...action.existing,
                filterSearch: {
                    ...action.existing.filterSearch,
                    price: null
                },
            }  
        }
        case "DELETE_ACCOMTYPE_FILTER": {
            return{
                ...action.existing,
                filterSearch: {
                    ...action.existing.filterSearch,
                    accomType: null
                },
            }  
        }
        case "DELETE_OTHERFILTER": {
            return{
                ...action.existing,
                filterSearch: {
                    ...action.existing.filterSearch,
                    otherFilter: null
                },
            }  
        }
        default:
            return initialState
    }
}