export function LoadingProfile(){
    return (
        <div>
            loading
        </div>
    )
}
interface ErrorProfileProps{
    message: string;
    cause: string
}


export function ErrorProfile({message, cause}: ErrorProfileProps){
    return (
        <>
        {message}
        {cause}
        </>
    )
}