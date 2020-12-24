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

export const login = (user) => {
    return {
        type: "LOGIN",
        user
    }
}

export const logout = (user) => {
    return {
        type: "LOGOUT",
    }
}

export const change_chat_tile = (data) => {
    return {
        type: "CHANGE_CHAT_TITLE",
        data
    }
}

export const get_room_and_contactid = (data) => {
    return {
        type: "GET_ROOM_AND_CONTACTID",
        data
    }
}

export const get_location_search = (data, existing) => {
    return{
        type:"GET_LOCATION_SEARCH",
        data,
        existing
    }
}
export const update_message_list = (data) => {
    return {
        type: "UPDATE_MESSAGE_LIST",
        data
    }
}