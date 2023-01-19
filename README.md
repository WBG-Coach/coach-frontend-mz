# Coach digital
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/WBG-Coach/coach-admin/blob/main/LICENSE.md)

> This is the frontend application of the "Aprender+" project, created by the World Bank to help evaluate teachers and manage improvements in teaching through feedback.

### You can access here:
[https://coachdigital.org/](https://coachdigital.org/)

<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
  <img width="23%" src="https://user-images.githubusercontent.com/13595853/213287692-a5c2a9f4-d7c3-472f-934e-f304a6fa3c53.png" />
  <img  width="23%" src="https://user-images.githubusercontent.com/13595853/213287737-f4e665d7-1fce-413d-8ceb-14f809d280b8.png" />
  <img width="23%" src="https://user-images.githubusercontent.com/13595853/213290357-93e157e0-9660-43ba-8374-45dc747e1037.png" />
  <img width="23%" src="https://user-images.githubusercontent.com/13595853/213291784-3b5019ff-94d5-4819-8d72-cb34b30b2d0c.png" />
</div>

## Getting Started

Add tour application configuration to your `.env` file in the root of your project:

```shell
REACT_APP_API_URL=
REACT_APP_AWS_BUCKET_NAME=
```

Install dependencies:

```shell
$ npm install
```

Start project:

```shell
$ npm run start
```

### Directory tree

    .
    ├── assets                      # Images and guide pdf
    │   └── ...                     
    ├── components                  # All componentes from application
    │   └── ...                     
    ├── hooks                       
    │   └── index.ts                # Custom hooks
    ├── i18n                        
    │   ├── en.json                 # English keys
    │   ├── pt.json                 # Portuguese keys
    │   └── index.ts                # i18n configuration
    ├── routes
    │   ├── ...                     # All page files
    ├── services
    │   └── index.ts                # All apis from the aplications with Redux toolkit query
    ├── storage
    │   └── index.ts                # Functions to set and get information in local storage
    ├── store
    │   ├── auth                    # Reducers and selectors from auth context
    │   ├── guide                   # Reducers and selectors from guide context
    │   └── index.ts                # Redux configuration
    ├── theme
    │   └── index.ts                # Theme file
    └── util
    │   └── index.ts                # Util functions
    ├── ...
    └── index.ts                    # Routes configurations with lazy load
    

### Main libraries
<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
  <img width="15%" src="https://user-images.githubusercontent.com/13595853/213292865-f145bf92-2aac-419e-bd5d-5fc4c387e9cd.png" />
  <img width="15%" src="https://user-images.githubusercontent.com/13595853/213292795-8e0fd530-745c-4222-a69d-f6d61b3486d4.png" />
  <img width="15%" src="https://user-images.githubusercontent.com/13595853/213293171-b7eba42c-b3b7-49d6-bd6b-2ea9abff0e14.png" />
</div>
