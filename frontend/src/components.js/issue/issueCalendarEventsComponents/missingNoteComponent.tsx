const companentStyle = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"2rem",
    
}

export const MissingNoteComponet= ({noteText}:{noteText:string})=>{
return (<h1 style={companentStyle}>
    {noteText}
</h1>)
}