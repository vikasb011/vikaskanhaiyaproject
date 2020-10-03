// let data = JSON.parse(localStorage.getItem('loginData'));
// let roleId = data[0].role_id




export const MenuItems = [
    {
    "path": "dashboard",
    "name": "Dashboard",
    "icon": "fa-home"
    },
    {
        "path": "all-sessions",
        "name": "Sessions",
        "icon": "fa-tags"
    },
    {
      "path": "sponsor",
      "name": "Sponsors",
      "icon": "fa-donate",
    },


      {
        "path": "lobby",
        "name": "Lobby",
        "icon": "fa-tags",
        "children": [
            {
                "path": "lobby/session",
                "name": "Sessions",
                "icon": "fa-list-alt"

            },
            {
                "path": "lobby/chats",
                "name": "Chats",
                "icon": "fa-hand-stop-o"

            },
            {
                "path": "lobby/attendees",
                "name": "Attendants",
                "icon": "fa-users"

            }
        ]
      }

]
