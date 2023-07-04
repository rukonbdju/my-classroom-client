import Reply from "../Reply/Reply"

const ReplyBox=({replies})=>{
    console.log(replies)
    return (
        <>
        {replies?.map((reply,index)=><Reply key={index} reply={reply} ></Reply>)}
        </>
    )
}

export default ReplyBox