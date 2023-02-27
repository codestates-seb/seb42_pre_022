

export const allquestions= [
  {
    "questionId": 54343,
    "userId": null,
    "title": "Extracting output from Postman using Python",
    "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
    "displayName": null,
    "answerCount": 5,
    "viewCount": 5,
    "createdAt": "2023-01-03T09:48:00.000Z",
    "modifiedAt": null,
    "closedAt": null,
    "tags": ["javascipt","angular"]
  },
  {
      "questionId": 14343,
      "userId": null,
      "title": "Extracting output from Postman using Python",
      "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
      "displayName": null,
      "answerCount": 0,
      "viewCount": 0,
      "createdAt": "2023-02-24T03:48:00.000Z",
      "modifiedAt": null,
      "closedAt": null,
      "tags": ["angular"]
  },
{
  "questionId": 323321,
  "userId": null,
  "title": "Extracting output from Postman using Python",
  "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
  "displayName": null,
  "answerCount": 2,
  "viewCount": 2,
  "createdAt": "2023-01-23T07:48:00.000Z",
  "modifiedAt": null,
  "closedAt": null,
  "tags": ["javascipt"]
},
{
  "questionId": 341453,
  "userId": null,
  "title": "Extracting output from Postman using Python",
  "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
  "displayName": null,
  "answerCount": 3,
  "viewCount": 3,
  "createdAt": "2023-01-29T20:48:00.000Z",
  "modifiedAt": null,
  "closedAt": null,
  "tags": ["angular"]
},
{
  "questionId": 243434,
  "userId": null,
  "title": "Extracting output from Postman using Python",
  "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
  "displayName": null,
  "answerCount": 1,
  "viewCount": 1,
  "createdAt": "2023-01-24T18:48:00.000Z",
  "modifiedAt": null,
  "closedAt": null,
  "tags": ["javascipt","angular"]
},
{
  "questionId": 4324324,
  "userId": null,
  "title": "Extracting output from Postman using Python",
  "body": "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
  "displayName": null,
  "answerCount": 4,
  "viewCount": 4,
  "createdAt": "2023-02-27T14:48:00.000Z",
  "modifiedAt": null,
  "closedAt": null,
  "tags": ["javascipt"]
},
]

export function filteringposts (posts,filter) {
  const filteredposts = posts.filter((post)=>{
    let filtering = true;
    if(filter.unanswered){
      filtering = post.answerCount === 0
    }
    if(!!filter.tags.length){
      for(let i of filter.tags){
        console.log(i)
        filtering = post.tags.include(i)
      }
    }
    return filtering
  })
  return filteredposts
}

export function sortingposts (posts,filter) {
  const sorted = posts 
  if(filter.newest){
    sorted.sort((b,a)=>new Date(a.createdAt)-new Date(b.createdAt))
  }
  return sorted
}
