const componentStyle = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"2rem",
    
}

export const MissingNoteComponet = ({noteText}:{noteText:string})=>{
return (<h1 style={componentStyle}>
    {noteText}
</h1>)
}