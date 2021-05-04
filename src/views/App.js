import {useDispatch, useSelector} from "react-redux"; // Automatically passes the store to all child components
import { getPosts, getUsers } from "../redux/actions";
import { useEffect } from "react";
import MainApp from "../components/MainApp";
import Header from "../components/Header";
import Onboarding from "../components/Onboarding";


const App = () =>  {

    const dispatch = useDispatch();
    const isNewUser = useSelector(state => state.isNewUser);

    useEffect( () => {
      dispatch(getPosts());
      dispatch(getUsers());
    }, [])

    return (

      <> 
        <Header/>
        {
          (isNewUser === undefined || isNewUser === false) ?
          <MainApp/>
          :
          <Onboarding />
        }
      </>
    )
}
export default App;
