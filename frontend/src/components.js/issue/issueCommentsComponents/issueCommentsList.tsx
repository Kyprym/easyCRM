import { Button, Stack } from "@mui/material"
import { IssueComment } from "./issueComment"
import { getLowList } from "../modules/issueFunctionalFuncs"
import { useState } from "react"
import { MissingNoteComponet } from "../issueCalendarEventsComponents/missingNoteComponent"
import { useSelector } from "react-redux"

interface issueCommentsListProps{
    comments:object[]
}

export const IssueCommentsList = ({comments}:issueCommentsListProps)=>{
    const lowCommentsList:object[] = getLowList(comments, 5)
    const [commentsListState, setCommentsListState] = useState(lowCommentsList)
    const usersList = useSelector(state =>state.issue.issue.users)
  
    const showMoreComments = () => {
        if (commentsListState.length <= 5) {
            setCommentsListState(comments);
        } else {
            setCommentsListState(lowCommentsList);
        }
      };
    
      
    return <Stack
    direction={'column'}
    spacing={1}
        >

        {
            commentsListState.length <4?
                <></>:
                <Button
                variant="contained"
                sx={{width:"11rem"}}
                disableElevation
                onClick={showMoreComments}
              >
                {commentsListState.length <= 5 ? "Показать больше" : "Скрыть"}
              </Button>
        
        }


      {
        commentsListState.length == 0?
            <MissingNoteComponet
                    noteText="Комментарии отсутствуют"
                />
                :
                commentsListState.map((comment)=>{
                    let userName = ''
                    for (let i = 0; i < usersList.length; i++) {
                        if(usersList[i].user_id == comment.user){
                          userName = usersList[i].user_login
                        }
                    }

                    return <IssueComment
                        key={comment.id}
                        user={userName}
                        createDate={comment.createDate}
                        text={comment.text}
                    />
                })
      }

{
    commentsListState.length <4?
        <></>:
        <Button
        variant="contained"
        sx={{width:"11rem"}}
        disableElevation
        onClick={showMoreComments}
      >
        {commentsListState.length <= 5 ? "Показать больше" : "Скрыть"}
      </Button>

}



</Stack>
}