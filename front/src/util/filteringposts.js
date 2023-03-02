export function filteringposts (posts,filter) {
  // console.log(filter)
  const filteredposts = posts.filter((post)=>{
    let filtering = true;
    if(filter.unanswered){
      filtering = post.answerCount === 0
    }
    if(!!filter.tags.length){
      filtering = false
      for(let i of filter.tags){
        if(filtering===false){
          filtering = post.tagList && post.tagList.reduce((acc,cur)=>{
            if(cur.tagName === i){
              acc=true
            }
            return acc
          },false)
          console.log(filtering)
        }
      }
    }
    if(!!filter.user.length){
      filtering = post.user.displayName === filter.user
    }
    if(filter.answerCount !== null){
      // console.log(post.answerCount >= filter.answerCount)
      filtering = post.answerCount >= filter.answerCount
    }
    if(!!filter.searchedBy && filter.answerCount === null && filter.user.length===0 && filter.tags.length===0){
      
      // console.log("서치중")
      filtering = post.body.replace(/<\/?[^>]+(>|$)/g, '').toLowerCase().split(' ').includes(filter.searchedBy.toLowerCase())
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
