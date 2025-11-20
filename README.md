EXPRESS JS - MongoDB

API ENDPOINTS

1) Creating a new Event                        - /event/create-event
   Sample JSON body
   {
     "title": "Dance",
     "details": "Registeration closed",
     "on": "2024-08-10T11:30:00.000Z",
     "venue": "Trivandrum",
     "registrationLink": "Link",
  }
2) Get all events which are not over           - /event/event-active    (Based On Current Date)
3) Get details of an event with given ID       - /event/event-details/:id
4) Get list of events between two given dates  - /event/event-window/:first/:last
5) Update details of an event with given ID    - /event/event-update/:id
6)Delete an event with given ID                - /event/event-delete/:id
