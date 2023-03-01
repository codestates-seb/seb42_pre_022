

export const allquestions= [
  {
    "questionId": 544343,
    "userId": null,
    "title": "Extracting output from Postman using Python",
    "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
    "displayName": null,
    "answerCount": 5,
    "viewCount": 5,
    "createdDate": "2023-01-28T20:48:00.000Z",
    "modifiedAt": null,
    "closedAt": null,
    "tagList": ["javascript","angular"],
    "user" : {
      "displayName": "addd",
      "email": "gacow82488@wwgoc.com",
      "profileImage": "https://source.boringavatars.com/beam/120/6?colors=66FFFF,8CBFE6,B380CC,D940B3,FF0099",
      "reputation": 1,
      "userId": 6
    }
  },
  {
    "questionId": 1434333333,
    "userId": null,
    "title": "Extracting output from Postman using Python",
    "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
    "displayName": null,
    "answerCount": 0,
    "viewCount": 0,
    "createdDate": "2023-01-28T20:48:00.000Z",
    "modifiedAt": null,
    "closedAt": null,
    "tagList": ["angular"],
    "user" : {
      "displayName": "joa",
      "email": "gacow82488@wwgoc.com",
      "profileImage": "https://source.boringavatars.com/beam/120/6?colors=66FFFF,8CBFE6,B380CC,D940B3,FF0099",
      "reputation": 1,
      "userId": 6
    }
  },
{
  "questionId": 32311321,
  "userId": null,
  "title": "Extracting output from Postman using Python",
  "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
  "displayName": null,
  "answerCount": 2,
  "viewCount": 2,
  "createdDate": "2023-01-28T20:48:00.000Z",
  "modifiedAt": null,
  "closedAt": null,
  "tagList": ["javascript"],
  "user" : {
    "displayName": "gacow82488",
    "email": "gacow82488@wwgoc.com",
    "profileImage": "https://source.boringavatars.com/beam/120/6?colors=66FFFF,8CBFE6,B380CC,D940B3,FF0099",
    "reputation": 1,
    "userId": 6
  }
},
{
  "questionId": 54343,
  "userId": null,
  "title": "Extracting output from Postman using Python",
  "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
  "displayName": null,
  "answerCount": 5,
  "viewCount": 5,
  "createdDate": "2023-01-01T20:48:00.000Z",
  "modifiedAt": null,
  "closedAt": null,
  "tagList": ["javascript","angular"],
  "user" : {
    "displayName": "gacow82488",
    "email": "gacow82488@wwgoc.com",
    "profileImage": "https://source.boringavatars.com/beam/120/6?colors=66FFFF,8CBFE6,B380CC,D940B3,FF0099",
    "reputation": 1,
    "userId": 6
  }
},
{
  "questionId": 1454343,
  "userId": null,
  "title": "Extracting output from Postman using Python",
  "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
  "displayName": null,
  "answerCount": 0,
  "viewCount": 0,
  "createdDate": "2023-01-29T20:48:00.000Z",
  "modifiedAt": null,
  "closedAt": null,
  "tagList": ["angular"],
  "user" : {
    "displayName": "gacow82488",
    "email": "gacow82488@wwgoc.com",
    "profileImage": "https://source.boringavatars.com/beam/120/6?colors=66FFFF,8CBFE6,B380CC,D940B3,FF0099",
    "reputation": 1,
    "userId": 6
  }
},
{
"questionId": 3233234231,
"userId": null,
"title": "Extracting output from Postman using Python",
"body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
"displayName": null,
"answerCount": 2,
"viewCount": 2,
"createdDate": "2023-02-28T20:48:00.000Z",
"modifiedAt": null,
"closedAt": null,
"tagList": ["javascript"],
"user" : {
  "displayName": "gacow82488",
  "email": "gacow82488@wwgoc.com",
  "profileImage": "https://source.boringavatars.com/beam/120/6?colors=66FFFF,8CBFE6,B380CC,D940B3,FF0099",
  "reputation": 1,
  "userId": 6
}
}
]

export function filteringposts (posts,filter) {
  const filteredposts = posts.filter((post)=>{
    let filtering = true;
    if(filter.unanswered){
      filtering = post.answerCount === 0
    }
    if(!!filter.tags.length){
      filtering = false
      for(let i of filter.tags){
        if(filtering===false){filtering = post.tagList && post.tagList.includes(i)}
        //! tag구현 안됐을 시에는 includes 검증 안되게
      }
    }
    if(!!filter.user.length){
      console.log('user필터링중')
      filtering = post.user.displayName === filter.user
    }
    if(filter.answerCount !== null){
      filtering = post.answerCount >= filter.answerCount
    }    
    return filtering
  })
  return filteredposts
}

export function sortingposts (posts,filter) {
  const sorted = posts 
  if(filter.newest){
    sorted.sort((b,a)=>new Date(a.createdDate)-new Date(b.createdDate))
  }
  return sorted
}
