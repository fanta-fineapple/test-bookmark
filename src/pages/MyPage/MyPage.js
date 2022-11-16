import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BottomSheetModal from "../../components/BottomSheetModal";
import { AiFillCamera } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import styled from "styled-components";
import { deleteStorage, userProfileUpdate } from "../../api/axios";
import { storage } from "../../config/keys";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/keys";
import { signOut } from "firebase/auth";
import CropControl from "../../components/CropControl.js";

const MyPage = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [isEditName, setIsEditName] = useState(false);
  const [bottomModalShow, setBottomModalShow] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [cropVisible, setCropVisible] = useState(false);
  const users = useSelector((state) => state.users);

  const navigate = useNavigate();

  useEffect(() => {
    setProfilePic(users.photoUrl);
    setName(users.name);
  }, [users]);

  const getCropData = async () => {
    if (typeof cropper === "undefined") return;

    setLoading(true);
    setCropVisible(false);
    const cropImage = cropper.getCroppedCanvas().toDataURL();
    const imageURL = await uploadImage(cropImage);
    await userProfileUpdate(users.uid, { photoUrl: imageURL });
    setProfilePic(imageURL);
    setLoading(false);
  };
  console.log(users.uid);

  const uploadImage = async (cropImage) => {
    const img = await fetch(cropImage);
    const blob = await img.blob();
    const filename = cropImage.substring(cropImage.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `users/${filename}`);

    await uploadBytes(storageRef, blob);
    const fileURL = await getDownloadURL(ref(storage, storageRef));
    return fileURL;
  };

  const deleteProfilePic = async () => {
    setBottomModalShow(false);
    if (profilePic === "") {
      return;
    }
    setLoading(true);
    await userProfileUpdate(users.uid, { photoUrl: "" });
    await deleteStorage(profilePic);
    setProfilePic("");
    setLoading(false);
  };

  const upload = (file) => {
    setBottomModalShow(false);
    setCropVisible(true);
    setCropData(URL.createObjectURL(file));
  };

  const updateProfileName = async () => {
    setLoading(true);
    await userProfileUpdate(users.uid, { name });
    setIsEditName(false);
    setLoading(false);
  };

  console.log(loading);
  return (
    <MyPageContainer>
      <ProfileContainer>
        <ProfilePic>
          <Picture>
            <div className="pic">
              {profilePic === "" && (
                <img src="/assets/default_profile.jpg" alt="프로필 사진" />
              )}
              {profilePic !== "" && <img src={profilePic} alt="프로필 사진" />}
            </div>
            <div
              className="changePicButton"
              onClick={() => setBottomModalShow(true)}
            >
              <AiFillCamera className="cameraIcon" />
            </div>
            <BottomSheetModal
              isModalOpen={bottomModalShow}
              closeModal={() => setBottomModalShow(false)}
              profile
              imageUpload={(e) => {
                upload(e.target.files[0]);
              }}
              deleteProfilePic={deleteProfilePic}
            />
            {cropVisible && (
              <CropControl
                cropData={cropData}
                setCropper={setCropper}
                getCropData={getCropData}
                cropVisible={() => setCropVisible(false)}
                profile
              />
            )}
          </Picture>
        </ProfilePic>
        <ProfileName>
          <Name>
            {isEditName ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span>{name}</span>
            )}

            <MdModeEdit
              className="editIcon"
              onClick={() =>
                isEditName ? updateProfileName() : setIsEditName(true)
              }
            />
          </Name>
        </ProfileName>
        <ProfileCode>{users.code}</ProfileCode>
      </ProfileContainer>

      <MyPageList>
        <ul>
          <li onClick={() => navigate("/friendlist")}>친구 목록</li>
          <li onClick={() => navigate("/addfriend")}>친구 추가</li>
          <li>찜한 도서</li>
          <li onClick={() => signOut(auth)}>로그아웃</li>
        </ul>
      </MyPageList>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.div``;

const ProfileContainer = styled.div`
  padding-bottom: 30px;
`;

const ProfilePic = styled.div``;

const Picture = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto;

  .pic {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #666bdb;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .changePicButton {
    position: absolute;
    right: 2px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #666bdb;

    .cameraIcon {
      font-size: 13px;
      color: white;
      text-align: center;
    }
  }
`;

const ProfileName = styled.div`
  padding: 20px 0;
  text-align: center;

  .editIcon {
    position: absolute;
    right: -20px;
    color: #666bdb;
  }
`;

const Name = styled.span`
  position: relative;

  input {
    padding-bottom: 5px;
    border: none;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
`;

const ProfileCode = styled.div`
  font-size: 0.9rem;
  text-align: center;
`;

const MyPageList = styled.div`
  li {
    padding: 20px 10px;
  }
`;
