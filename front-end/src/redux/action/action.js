export const change_background_dark_mode = (existing) => {
    return {
        type: "CHANGE_BG_DARK_MODE",
        existing
    }
}

export const change_background_normal_mode = (existing) => {
    return {
        type: "CHANGE_BG_NORMAL_MODE",
        existing
    }
}

export const login = (user, token) => {
    return {
        type: "LOGIN",
        user, 
        token
    }
}

export const logout = (user) => {
    return {
        type: "LOGOUT",
    }
}

export const change_chat_tile = (data, token) => {
    return {
        type: "CHANGE_CHAT_TITLE",
        data,
        token
    }
}

export const get_room_and_contactid = (data, token) => {
    return {
        type: "GET_ROOM_AND_CONTACTID",
        data, 
        token
    }
}

export const get_location_search = (data, existing) => {
    return{
        type:"GET_LOCATION_SEARCH",
        data,
        existing
    }
}

export const remove_all_search = (existing) => {
    return{
        type:"REMOVE_ALL_SEARCH",
        existing
    }
}
export const update_message_list = (data) => {
    return {
        type: "UPDATE_MESSAGE_LIST",
        data
    }
}

export const get_search_filter = (data, existing) => {
    return{
        type:"GET_FILTER_SEARCH",
        data,
        existing
    }
}

export const delete_price_filter = (existing) => {
    return{
        type:"DELETE_PRICE_FILTER",
        existing
    }
}

export const delete_accomtype_filter = (existing) => {
    return{
        type:"DELETE_ACCOMTYPE_FILTER",
        existing
    }
}
export const delete_otherfilter = (existing) => {
    return{
        type:"DELETE_OTHERFILTER",
        existing
    }
}

export const update_account = (data, existing) => {
    return {
        type:"UPDATE_ACCOUNT",
        data,
        existing
    }
}