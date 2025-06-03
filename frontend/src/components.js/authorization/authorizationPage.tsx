
import { Box, Stack } from "@mui/system"
import { AuthorizationFormComponent } from "./authorizationForm"

export const AuthorizationPage = ()=>{

   
     return (
        <Stack
          direction="column"
          spacing={10}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Box 
            sx={{display:"flex", justifyContent:'center', alignItems:"center", height: "10vh", width:"100%", backgroundColor:"rgb(36, 122, 209)", color:"white", fontSize:"2rem" }}>
              easyCRM
              </Box>
            <AuthorizationFormComponent/>
            
            </Stack>
  
      );
}