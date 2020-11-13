import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./Global/CurrentUserContext";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { COLORS } from "./Global/constants";
import { ProfileNavBar } from "./ProfileNavBarRendering/ProfileNavBar";
import { ProfileTweets } from "./ProfileNavBarRendering/ProfileTweets";
import { ProfileMedias } from "./ProfileNavBarRendering/ProfileMedias";
import { ProfileLikes } from "./ProfileNavBarRendering/ProfileLikes";

const ProfileWrapper = styled.div`
  position: relative;
  font-size: 1.3rem;
  border: 1px solid lightgray;
`;

const Following = styled.div`
  position: absolute;
  right: 20px;
  top: 460px;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 25px;
  border: 0px;
  width: 130px;
  text-align: center;
`;

const FollowButton = styled.button`
  position: absolute;
  right: 20px;
  top: 460px;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 25px;
  border: 0px;
  width: 130px;

  &:hover {
    background-color: ${COLORS.hover};
    cursor: pointer;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  height: 400px;
  background-size: cover;
`;
const ProfileImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 3px solid white;
  position: absolute;
  left: 30px;
  top: 270px;
`;
const InfosDisplay = styled.div`
  margin: 150px 10px 40px 10px;
`;
const Name = styled.div`
  font-size: 2rem;
  font-weight: bolder;
`;

const HandleAndFollowsYouWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  color: gray;
`;

const FollowsYou = styled.p`
  background-color: #e7e3e3;
  margin-left: 15px;
  padding: 0 5px;
  border-radius: 7px;
`;

const Status = styled.div`
  margin-top: 20px;
`;

const LocationAndDateWrapper = styled.div`
  display: flex;
  color: gray;
  margin-top: 20px;
`;

const DateJoined = styled.div`
  margin-left: 20px;
`;

const NumFollowsAndFollowersWrapper = styled.div`
  display: flex;
  color: gray;
  margin-top: 20px;
`;
const BoldSpan = styled.span`
  font-weight: bold;
  color: black;
`;
const NumFollowers = styled.div`
  margin-left: 40px;
`;

const NavbarRendering = styled.div`
  margin: 30px 0 100px 0;
  padding: 5px;
`;

export const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [userProfileData, setUserProfileData] = useState();
  const [display, setDisplay] = useState("Tweet");
  let { profileId } = useParams();

  // console.log(display);
  const isCurrentUser = currentUser.handle === userProfileData?.handle;

  const query =
    profileId !== currentUser.handle
      ? `/api/${profileId}/profile`
      : `/api/me/profile`;

  const handleFollowButtonClick = () => {
    userProfileData.isBeingFollowedByYou = true;
  };

  const fetchOtherUserProfileData = async () => {
    try {
      const response = await fetch(query);
      const data = await response.json();
      setUserProfileData(data.profile);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userProfileData);

  useEffect(() => {
    fetchOtherUserProfileData();
  }, [profileId]);

  return (
    <>
      {userProfileData ? (
        <ProfileWrapper>
          <BannerImg src={userProfileData.bannerSrc} />
          <ProfileImg src={userProfileData.avatarSrc} />
          {!isCurrentUser && userProfileData.isBeingFollowedByYou ? (
            <FollowButton onClick={(e) => handleFollowButtonClick()}>
              Follow
            </FollowButton>
          ) : (
            <Following>Following</Following>
          )}
          <InfosDisplay>
            <Name>{userProfileData.displayName}</Name>
            <HandleAndFollowsYouWrapper>
              @{userProfileData.handle}
              {userProfileData.isFollowingYou && (
                <FollowsYou>Follows you</FollowsYou>
              )}
            </HandleAndFollowsYouWrapper>
            <Status>{userProfileData.bio}</Status>
            <LocationAndDateWrapper>
              <div>
                <FiMapPin /> {userProfileData.location}
              </div>
              <DateJoined>
                <FiCalendar /> {userProfileData.joined}
              </DateJoined>
            </LocationAndDateWrapper>
            <NumFollowsAndFollowersWrapper>
              <div>
                <BoldSpan>{userProfileData.numFollowing}</BoldSpan> Following
              </div>
              <NumFollowers>
                <BoldSpan>{userProfileData.numFollowers}</BoldSpan> Followers
              </NumFollowers>
            </NumFollowsAndFollowersWrapper>
          </InfosDisplay>
          <ProfileNavBar setDisplay={setDisplay} />
          <NavbarRendering>
            {display === "Tweet" && <ProfileTweets profileId={profileId} />}
            {display === "Media" && <ProfileMedias />}
            {display === "Likes" && <ProfileLikes />}
          </NavbarRendering>
        </ProfileWrapper>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
