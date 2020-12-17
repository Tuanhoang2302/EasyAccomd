const RoomChat = require('./Chat/RoomChat');

module.exports = {
    User: require('./User/User'),
    Account: require('./User/Account'),
    
    Accomodation: require('./Accomodation/Accomodation'),
    Address: require('./Accomodation/Address'),
    Conveniences: require('./Accomodation/Conveniences'),
    Report: require('./Accomodation/Report'),
    Reservation: require('./Accomodation/Reservation'),
    Chat: require('./Accomodation/Chat'),
    Comment: require('./Accomodation/Comment'),
    Notification: require('./Accomodation/Notification'),
    Favorite: require('./Accomodation/Favorite'),

    Request: require('./Analysis/Request'),
    RoomChat: require('./Chat/RoomChat'),
    Message: require('./Chat/Message')
}