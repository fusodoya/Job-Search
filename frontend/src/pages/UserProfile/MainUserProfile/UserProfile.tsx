import React from "react";
import MyHeader from "../../../components/MyHeader";
import { useEffect } from "react";
import { createContext, useState } from "react";
// import { useParams } from "react-router-dom";
import UserHeader from "../UserHeader/UserHeader";
import UserMainProfile from "./MainUserProfile";
import { useNavigate } from 'react-router-dom';
import {BsPencilSquare} from "react-icons/bs";
import {Button} from "react-bootstrap";
export const EditingContext = createContext(false);


interface UserProfileProps {
  userID: string | null;
  isOwer: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userID, isOwer}) => {
  const navigate = useNavigate();
  const [myActiveKey, setMyActiveKey] = React.useState("/snapshot");
  const isOwnProfile = isOwer || false;
  const [isEditing, setIsEditing] = useState(false);
  

  useEffect(() => {
    if (myActiveKey === "/job-search-cv") {
    const currentPath = window.location.pathname.split("/snapshot")[0];
      navigate(currentPath + myActiveKey);
    }
  }, [myActiveKey, navigate, userID]);

  console.log("Is Own Profile:", isOwnProfile); 

  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <MyHeader mydefaultActiveKey="/user"/>
      <EditingContext.Provider value={isEditing}>
      <UserHeader  myState={myActiveKey} setMyState={setMyActiveKey} userID={userID}/>
        <UserMainProfile  userID={userID} />
      </EditingContext.Provider>
      {isOwnProfile && (
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="position-fixed"
                    style={{
                        bottom: "1rem",
                        right: "1rem",
                        borderRadius: "50%",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    variant="primary"
                >
                  <BsPencilSquare size={20}/>
                </Button>
            )}
    </div>
  );
}

export default UserProfile;