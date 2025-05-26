import { SignUp } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom';


const SignUpPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-mainBackground p-4">
            <div className="w-[full max-w-md] flex-col">
                <SignUp
                    signInUrl="/signIn"
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-navOrange hover:bg-navOrange text-white",
                            card: "shadow-lg ",
                            headerTitle: "text-white",
                            headerSubtitle: "text-white",
                            footerActionText: "text-white",
                            socialButtons: "gap-2 bg-mainBackground rounded-xl",
                            socialButtonsBlockButtonText: "text-white",
                            formFieldInputShowPasswordButton: "text-white"
                        },
                        variables: {
                            colorPrimary: "#F5972F",
                            colorBackground: "#2D2D2D",
                            colorText: "#FFFFFF",
                            colorInputBackground: '#161616'
                        },
                    }}   
                />
                <div className="mt-4 text-center w-full">
                    <NavLink 
                        to="/landing" 
                        className="text-white hover:text-navOrange hover:underline"
                    >
                        Back
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
  


export default SignUpPage;