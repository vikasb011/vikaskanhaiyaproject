export const ApiConstants = {
    login: 'beliveapi/v1/auth/attendee/get',
    loggedinUser: 'beliveapi/v1/auth/get/loggedin/user/event_id',
    searchLoggedinUsers: 'beliveapi/v1/auth/get/loggedin/user/event_id',
    dashboard: 'beliveapi/v1/event/getEvents/token',
    sponosorLeadGenerate: 'beliveapi/v1/event/sponsor/lead/generate',
    lobby: 'beliveapi/v1/event/lobby/list/event_id',
    bookTableBook: 'beliveapi/v1/event/lobby/table/book/event_id',
    leaveSeatLobby: 'beliveapi/v1/event/lobby/leave/user_id',
    getMenuItems: 'beliveapi/v1/menu/get',
    sponsorGetLeads: 'beliveapi/v1/event/sponsor/lead/get/token',
    getSponsorData: 'beliveapi/v1/event/sponsor/detail/id',
    postRequestChat: 'beliveapi/v1/event/sponsor/chat/request/add',
    getChatRequests: 'beliveapi/v1/event/sponsor/chat/request/list/event_id',
    aprovechatRequests: 'beliveapi/v1/event/sponsor/chat/request/approval',
    registerSession: 'beliveapi/v1/auth/attendee/session/add',
    sessionsParticipants: 'beliveapi/v1/auth/session/attendee/get/session_id',
    searchSessionsParticipants: 'beliveapi/v1/auth/session/attendee/get/session_id',
    // moderator approval chat
    moderatorChat: 'comments',
    audienceChat: 'comment',
    approvChat: 'comment',

    // audience and speaker chats
    audienceAndSponsorChat: 'comments',
    twitterChat: 'beliveapi/v1/event/twitter/hashtag/list/session_id',
    approveTweets: 'beliveapi/v1/event/twitter/hashtag/approval',
    pollList: 'https://belive.multitvsolution.com/beliveapi/index.php/v2/get/poll_list',
    requsetScheduleDemo: 'beliveapi/v1/event/sponsor/demo/schedule/add',
    scheduleDemoList:'beliveapi/v1/event/sponsor/demo/schedule/list',
    approveSchedule: 'beliveapi/v1/event/sponsor/demo/schedule/approval',
    chatRooms: 'beliveapi/v1/event/session/chat_info',
    // audience raise hand request to moderator to connect with speaker
    raiseHandRequest:'beliveapi/v1/event/lobby/raise/hand',
    raiseHandPendingList: 'beliveapi/v1/event/lobby/raise/hand/list/session_id',
    approveCall: 'beliveapi/v1/event/lobby/raise/hand/approval',
    logout : 'beliveapi/v1/auth/attendee/logout'
};

