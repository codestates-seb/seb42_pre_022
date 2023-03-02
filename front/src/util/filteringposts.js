export function filteringposts (posts,filter,tags) {
  const filteredposts = posts.filter((post)=>{
    let filtering = true;
    if(filter.unanswered){
      filtering = post.answerCount === 0
    }
    if(!!filter.tags.length){
      filtering = false
      for(let i of filter.tags){
        if(filtering===false){
          // console.log(tags)
          // const a = {...post}
          // console.log(a)
          filtering = post.tagList && post.tagList.filter((ele)=>
          {
            return ele.tagName === i
          })
        }
        //! tag구현 안됐을 시에는 includes 검증 안되게
        //TODO
      }
    }
    if(!!filter.user.length){
      filtering = post.user.displayName === filter.user
    }
    if(filter.answerCount !== null){
      filtering = post.answerCount >= filter.answerCount
    }
    if(!!filter.searchedBy){
      filtering = post.body.split(' ').includes(filter.searchedBy)
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
