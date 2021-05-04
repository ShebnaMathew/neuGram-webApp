
import Posts from "./Posts";
import Sidebar from "./Sidebar";
import AddPost from "./AddPost";
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../redux/actions";
import { ADD_POST_PAGE } from "../redux/actionConstants";


const MainApp = () => {
    const viewState = useSelector(state => state.viewState);
    
    const dispatch = useDispatch();
    dispatch(getPosts())
  
    return (
        <div className="main-app-layout">
            <Sidebar />
        
            {
            (viewState === ADD_POST_PAGE ? 
            <AddPost />
            :
            <Posts/>)
            }
        </div>
    )


}

export default MainApp