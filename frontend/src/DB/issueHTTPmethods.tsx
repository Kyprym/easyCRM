
const accessToken:string = localStorage.getItem('accessToken') || ''
const userID:string = JSON.stringify(localStorage.getItem('id'))
export const sendAuthDatInDB = async (URL:string, authData:string) => {
  const response = await fetch(URL, {
        method:'POST',
        headers:{
        'Content-Type': 'application/json',
        'Authorization': authData
        },
  })

  if(response.status !== 200){
    return false
  }else{
    const resJSON = await response.json()
    return resJSON
  }
} 




export  const getIssueFromDB = async (URL:string) => {
  const response = await fetch(URL, {
      method: "GET",
      headers: {
        'Authorization':accessToken,
        'Content-Type': 'application/json',
      }
    });
  
    if (response.status !== 200) {
      return false
    }else{
      const resJSON = await response.json()
      return resJSON
    }
  }

  

export  const putIssueInDB = async (URL:string, status:number | string, issueKeyID:string) => {
    
  const response = await fetch(URL, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        status:status,
        issueKeyID:issueKeyID
      })
    });
  
    if (response.status !== 200) {
      return false
    }else{
      const resJSON = await response.json()
      return resJSON
    }
  }


export  const getFoundContragentsFromDB = async (searchInputText:string, URL:string) => {
  const contragentsURL:string = `${URL}/seachContragents`
  const response = await fetch(contragentsURL, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({chunkContragentName:searchInputText})
    });
  
    if (response.status !== 200) {
      return false
    }else{
      const resJSON = await response.json()
      return resJSON.contragentsArr
    }
  }
export  const putContragentInIssue = async (issueID:string, contragentID:number, URL:string) => {
  const contragentsURL:string = `${URL}/issues/${issueID}/putContragentInIssue`
  const response = await fetch(contragentsURL, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        issueID:issueID,
        contragentID:contragentID
      })
    });
  
    if (response.status !== 200) {
      return false
    }else{
      return true
    }
    }
      

export  const putIssueTheme = async (issueID:string, issueKeyID:string, newThemeText:string, URL:string) => {
  const contragentsURL:string = `${URL}/issues/${issueID}/putIssueTheme`
    const response = await fetch(contragentsURL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          issueID:issueID,
          issueKeyID:issueKeyID,
          newThemeText:newThemeText
        })
      });
    
      if (response.status !== 200) {
        return false
      }else{
        return true
          }
        }

export  const putIssueFirm= async (issueID:string, issueKeyID:string, newFirmID:number, URL:string) => {
  const contragentsURL:string = `${URL}/issues/${issueID}/putIssueFirm`
    const response = await fetch(contragentsURL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          issueID:issueID,
          issueKeyID:issueKeyID,
          newFirmID:newFirmID
        })
      });
    
      if (response.status !== 200) {
        return false
      }else{
        return true
      }
    }     
    
export const putIssueDescription = async (issueID:string, issueKeyID:string, newDescription:string, URL:string)=>{
 const descriptionURL:string = `${URL}/issues/${issueID}/changeDescription`
 const response = await fetch(descriptionURL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          issueID:issueID,
          issueKeyID:issueKeyID,
          newDescription:newDescription
        })
      });
    
      if (response.status !== 200) {
        return false
      }else{
        return true
      }

}
  
    export  const getUsersListFromDB = async (URL:string) => {
    
      const response = await fetch(`${URL}/users`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        });
      
        if (response.status !== 200) {
          return false
        }else{
          const resJSON = await response.json()
          return resJSON
        }
      }

export  const getEventStatusesListFromDB = async (URL:string) => {

  const response = await fetch(`${URL}/eventStatuses`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (response.status !== 200) {
      return false
    }else{
      const resJSON = await response.json()
      return resJSON
    }
  }

export const getEventAvtionTypes = async (URL:string)=>{
  const resp = await fetch(`${URL}/eventActionTypes`, {
    method:'GET',
    headers:{
      'Content-Type':"application/json"
    }
  })

  if(resp.status !==200){
      return false
  }else{
    const resJSON = await resp.json()
    return resJSON
  }
}

export const createIssueEvent = async (URL:string, eventData:object)=>{
  const resp = await fetch(`${URL}/createIssueEvent`, {
    method:'PUT',
    headers:{
      'Content-Type':"application/json",
      'authorization':JSON.stringify(userID)
    },
    body:JSON.stringify(eventData)
  })

  if(resp.status !==200){
      return false
  }else{
    const resJSON = await resp.json()
    return resJSON
  }
}

export const updateIssueEvent = async (URL:string, eventData:object)=>{
  const resp = await fetch(`${URL}/updateIssueEvent`, {
    method:'PUT',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(eventData)
  })
  if(resp.status !==200){
      return false
  }else{
    const resJSON = await resp.json()
    return resJSON
  }
}

export const createNewComment = async (URL:String, commentData:object)=> {
  const resp = await fetch(`${URL}/createCommentInIssue`,{
    method:"PUT",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(commentData)
  })
      if(resp.status !==200){
        return false
    }else{
      const resJSON = await resp.json()
      return resJSON
    }
}
    