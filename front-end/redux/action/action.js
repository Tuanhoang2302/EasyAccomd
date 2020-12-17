export const change_background_dark_mode = () => {
    return {
        type: "CHANGE_BG_DARK_MODE"
    }
}

export const change_background_normal_mode = () => {
    return {
        type: "CHANGE_BG_NORMAL_MODE"
    }
}

export const login = (user) => {
    return {
        type: "LOGIN",
        user
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

export const update_message_list = (data) => {
    return {
        type: "UPDATE_MESSAGE_LIST",
        data
    }
}