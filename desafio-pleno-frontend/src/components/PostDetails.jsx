

export default function PostDetail({post}){

    const $base_url = "http://localhost:8000/storage/"

return (
    <div className="w-full flex flex-col justify-center items-center break-breaks">
    <h1 className="text-4xl font-semibold mt-4 " >{post.title}</h1>
    <p className="text-lg mt-4">{post.content}</p>
    
    <div className="mt-4">
    <img src={`${$base_url}${post.photo}`} alt="" className="p-3 w-96 h-80"  />
    </div>

    </div>
)

}