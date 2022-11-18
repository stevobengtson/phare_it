# Phare It! - A web photo sharing application

## Description

Phar It! is a web site that users can sign up to and share photos with other users.
Users can upload and delete photos in their library as well as view other users photos.

### Tech Stack

- API
    - NodeJS
    - ExpressJS
    - MongoDB (using Mongoose)
- Client
    - Angular


### Requirements

- User
    - Register Account
    - Log in
    - Log out
    - Reset password?
    - ~~SSO (More complicated to set this up)~~
- Library
    - Create
    - View
    - Update
- Photo
    - Upload Photo
    - Delete Photo
    - Share Photo

Authentication
 - Login the user (get JWT)
 - Log out user (forget JWT)
 - Refresh Token?

### API Endpoints

Users
- POST /users
- GET /users _Admin only_
- GET /users/{id} _Admin or Owner only_
- PATCH /users/{id} _Admin or Owner only_
- DELETE /users/{id}  _Admin only_

Authentication
- POST /token
- PATCH /token/{id}
- DELETE /token

Library
- POST /libraries
- GET /users/{id}/libraries _Admin or Owner only_
- GET /libraries/{id}
- PATCH /libraries/{id} _Admin or Owner only_
- DELETE /libraries/{id} _Admin or Owner only_

Photo
- POST /photos
- GET /users/{id}/libraries/{id}/photos _Admin or Owner only_
- GET /photos/{id}
- DELETE /photos/{id} _Admin or Owner only_

### Database Design

User
- email: [required: true, type: string]
- password: [required: true, type: string] _Encoded_

Library
- user: [required: true, type: User]
- name: [required: true, type: string]

Photo
- library: [required: true, type: Library]
- image: [required: true, type: ???]