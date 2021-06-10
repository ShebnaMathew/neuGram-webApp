import {uploadProfilePic, updateUser} from "../redux/actions"
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";


const Settings = () => {
    const user = useSelector(state => state.user);
    const users = useSelector(state => state.users);
    const [postPictureURL, setProfilePictureURL] = useState("");
    const dispatch = useDispatch();

    const uploadPicture = (pic) => {
        console.log("picture: ", pic)
        console.log("users: ", users)
        console.log("user: ", user)
        dispatch(uploadProfilePic(pic, setProfilePictureURL));
        console.log("user id:", user.userId)
        
        //setPictureURL(pic)
        
    }

    const updateUserPicture = () => {
        dispatch(updateUser(postPictureURL, user.userId))
    }

    return(
        <div className="container settings">
        <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Profile Details
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div class="form-check">
            
            <label class="form-check-label" for="flexCheckDefault">
                Public profile
            </label>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        </div>
        <div class="input-group">
                        <input type="file" class="form-control" id="inputGroupFile05" aria-describedby="inputGroupFileAddon05" aria-label="Upload" onChange={(e) => uploadPicture(e.target.files[0])}/>
                        <button class="btn btn-outline-dark" type="button" id="inputGroupFileAddon05" onClick={(e) => updateUserPicture()}>Upload a Profile Picture</button>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Onboarding
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Something
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
</div>
    )
}

export default Settings;