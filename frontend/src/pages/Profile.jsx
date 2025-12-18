import { useParams } from 'react-router-dom';
import './Profile.css';
import React, { useState, useRef, useEffect } from 'react';

const Profile = () => {

const { username } = useParams();

const savedAvatar = localStorage.getItem(`profile_avatar_${username}`) 
                     || localStorage.getItem('profile_avatar');
const savedBanner = localStorage.getItem(`profile_banner_${username}`) 
                     || localStorage.getItem('profile_banner');
const savedBio = localStorage.getItem(`profile_bio_${username}`) 
                  || localStorage.getItem('profile_bio');
const [isEditing, setIsEditing] = useState(false);
const [avatar, setAvatar] = useState(savedAvatar || null);
const [tempAvatar, setTempAvatar] = useState(null);
const [banner, setBanner] = useState(savedBanner || null);
const [tempBanner, setTempBanner] = useState(null);
const [bio, setBio] = useState(savedBio || 'Информация о пользователе');
const [tempBio, setTempBio] = useState('');
  

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

useEffect(() => {
    if (savedAvatar === localStorage.getItem('profile_avatar')) {
      localStorage.removeItem('profile_avatar');
    }
    if (savedBanner === localStorage.getItem('profile_banner')) {
      localStorage.removeItem('profile_banner');
    }
    if (savedBio === localStorage.getItem('profile_bio')) {
      localStorage.removeItem('profile_bio');
    }
        if (avatar) {
      localStorage.setItem(`profile_avatar_${username}`, avatar);
    }
    
    if (banner) {
      localStorage.setItem(`profile_banner_${username}`, banner);
    }
    
    localStorage.setItem(`profile_bio_${username}`, bio);
  }, [avatar, banner, bio, username]);


  const handleAvatarClick = () => {
    avatarInputRef.current.click();
  };

  const handleBannerClick = () => {
    bannerInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempBanner(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditStart = () => {
    setTempAvatar(avatar);
    setTempBanner(banner);
    setTempBio(bio);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (tempAvatar) setAvatar(tempAvatar);
    if (tempBanner) setBanner(tempBanner);
    if (tempBio !== bio) setBio(tempBio);
    setIsEditing(false);
  };

  const bannerStyle = tempBanner 
    ? `url(${tempBanner})` 
    : banner 
    ? `url(${banner})` 
    : 'linear-gradient(to right, #b06b6b, #deb887)';

  const avatarStyle = tempAvatar 
    ? `url(${tempAvatar})` 
    : avatar 
    ? `url(${avatar})` 
    : 'none';

  const avatarBgColor = (!tempAvatar && !avatar) ? '#DEB887' : 'transparent';

  return (
    <div className="profile-container">
      <div className="profile-banner">
        <div 
          className="banner-image"
          style={{ backgroundImage: bannerStyle }}
        >
          {isEditing && (
        <button className="banner-edit-btn" onClick={handleBannerClick}>
  <img src="/icons/icons8-карандаш-24.png" alt="Изменить" width="24" height="24" />
</button>
          )}
        </div>
        <input
          type="file"
          ref={bannerInputRef}
          accept="image/*"
          onChange={handleBannerChange}
          className="file-input"
        />
      </div>

      <div className="profile-content">
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <div 
              className="avatar-image"
              style={{ 
                backgroundImage: avatarStyle,
                backgroundColor: avatarBgColor
              }}
            >
              {(!tempAvatar && !avatar) && <span>Аватар</span>}
            </div>
            {isEditing && (
              <button className="banner-edit-btn" onClick={handleBannerClick}>
  <img src="/icons/icons8-карандаш-24.png" alt="Изменить" width="24" height="24" />
</button>
            )}
          </div>
          <input
            type="file"
            ref={avatarInputRef}
            accept="image/*"
            onChange={handleAvatarChange}
            className="file-input"
          />
          <h2 className="username">{username}</h2>
        </div>

        <div className="profile-info">
 
          
          <div className="bio-content">
            {isEditing ? (
              <textarea
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                className="bio-textarea"
                rows="4"
                placeholder="Расскажите о себе..."
              />
            ) : (
              <p className="bio-text">{bio}</p>
            )}
          </div>
        </div>

        <div className="profile-actions">
          <button 
  className="edit-toggle-btn"
  onClick={isEditing ? handleSave : handleEditStart}
>
  {isEditing ? (
    'Применить'
  ) : (
    <>
      <img src="/icons/icons8-карандаш-24.png" alt="Edit" width="16" height="16" />
      Редактировать
    </>
  )}
</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;