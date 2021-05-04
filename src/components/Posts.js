import { useSelector } from "react-redux";
import Post from "./Post";

const Posts = () => {
    const posts = useSelector(state => state.posts);
    const ids = Object.keys(posts);
    
    // sort the post ids by time
    const rearrangedIds = ids.map(id => {
        const date = posts[id].datePosted;
        return [date, id]
    }).sort((elem1, elem2) => {
        return elem1[0] > elem2[0] ? 1 : elem1[0] < elem2[0] ? -1 : 0;
    }).reverse()

    return (
        <div className="container container-no-margins posts">

            {rearrangedIds.map((element, index)=>{
                return (
                    <div className="row justify-content-center" key={index}>
                        <Post key={index} id={element[1]} />
                    </div>
                )
            })}
        </div>
    )
}

export default Posts