import { useState } from 'react';
import { UserProfile } from '@clerk/clerk-react';

const ProfileSettings = () => {

    return (
        <div className='flex flex-col w-full min-h-screen items-center bg-mainBackground justify-center gap-8 py-[5%]'>
            <UserProfile 
                appearance={{
                    elements: {
                        badge: "shadow-[0_0_0_2px_#F5972F] text-white",
                        profileSectionPrimaryButton: "hover:bg-navOrange hover:bg-opacity-20",
                        menuButton: "hover:bg-navOrange hover:bg-opacity-20",
                        header: "border-b border-white border-opacity-20",
                        profileSection: "border-b border-white border-opacity-20",
                        profileSection__connectedAccounts: "border-opacity-0",
                        navbarButton: "text-white",
                        profileSectionPrimaryButton__danger: "hover:bg-red-500 hover:bg-opacity-20",
                        avatarImageActionsUpload: "bg-white/10 text-white"
                    },
                    variables: {
                        colorPrimary: "#F5972F",
                        colorBackground: "#2D2D2D",
                        colorText: "#FFFFFF",
                        colorInputBackground: '#161616',
                        colorInputText: "#FFFFFF",
                        colorDanger: "#dc2626"
                    }
                }}
            />
        </div>
    );
};

export default ProfileSettings;