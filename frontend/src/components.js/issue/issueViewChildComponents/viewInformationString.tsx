interface viewInformationStingProps{
    title:string,
    information?:string,
    bckgColor?:string,
    selectorState?:boolean,
    selector?:JSX.Element
}



export const ViewInformationString = ({data}:{data:viewInformationStingProps})=>{
    return (<>
        <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:'space-between',
            width:"100%",
            marginLeft:"1rem",
            marginTop:"0.5rem",
            }}>
            <span style={{
                fontWeight:'bold',
                padding:"0.2rem",
                }}>{data.title}:</span>
            <span style={{
                marginLeft:'1rem',
                backgroundColor:data.bckgColor || 'none',
                padding:"0.2rem",
                borderRadius:"0.3rem"
                }}>{data.selectorState?<>{data.selector}</>:data.information}</span>
        </div>
    </>)
}