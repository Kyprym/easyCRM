import { Avatar, Box, Button, Card, CardContent, Stack } from "@mui/material"
import { getLowName, getLowText } from "../modules/issueFunctionalFuncs"
import { useState } from "react"

interface issueCommentProps{
    user:string,
    createDate: Date,
    text:string
}

export const IssueComment = ({ user, createDate, text}:issueCommentProps)=>{
    const lowCommentsText:string = getLowText(text, 110)
    const [commentTextState, setCommentTextState] = useState(lowCommentsText)
    
    const showMoreTextComments = ()=>{
        setCommentTextState(text)
    }

    
    return (
        <Stack
            direction={'column'}
            spacing={'0.2rem'}
            padding={'0.5rem'}
        >
             <Box sx={{
                display:"flex",
                flexDirection:'row',
                margin:'1rem'     
            }} 
                >
                    <Avatar>{getLowName(user)}</Avatar>
                <Box sx={{margin:'0.5rem'}}>{user}</Box>
                <Box sx={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    fontSize:"0.8rem"
                    }}>
                        
                        <span>{String(createDate)}</span>
                </Box>
            </Box>

                <Card sx={{
                    backgroundColor:"white",
                    padding:"0.5rem",
                    wordWrap:"breake-word"
                 }}>
                     
                     <CardContent>
                        {commentTextState}
                        </CardContent>
                     </Card>
                     {
                     text.length >=113?
                     <Button sx={{width:"10rem"}} variant="outlined" size="small" onClick={
                        ()=>{
                            if(commentTextState.length <= 113){
                                showMoreTextComments()
                            }else{
                                setCommentTextState(lowCommentsText)
                            }
                        }
                     }>
                     {commentTextState.length <= 113? "Развернуть":"Свернуть"}
                        </Button>:<></>
                        }
                        

    </Stack>
    )
}

