import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onCreateModal,
  onSelectCard,
  onEditProfile,
  onLogout,
  onCardLike,
  loggedIn
}) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        cards={clothingItems}
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        onCardLike={onCardLike}
        loggedIn={loggedIn}
      />
    </div>
  );
}

export default Profile;
