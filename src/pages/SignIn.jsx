import { SignIn } from '@clerk/clerk-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/clerk-react';

const SignInPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { isLoaded: authLoaded, isSignedIn } = useAuth();
    const { isLoaded: signInLoaded } = useSignIn();
    const navigate = useNavigate();

    // If signed in, redirect to home
    if (authLoaded && isSignedIn) {
        navigate('/home');
        return null;
    }

    // Show loading state while Clerk is loading
    if (!authLoaded || !signInLoaded || isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-mainBackground p-4">
                <div className="flex items-center justify-center p-8 bg-headerGray rounded-lg shadow-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-navOrange"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-mainBackground p-4">
            <div className=" max-w-md flex-col">
                <div className="mb-3 text-center w-full">
                    <NavLink 
                        to="/landing" 
                        className="text-white hover:text-navOrange hover:underline"
                    >
                        <div className='flex items-center'>
                            <ChevronLeft className={`w-4 h-4 transition-transform `} />
                            <h2>Back</h2>
                        </div>
                    </NavLink>
                </div>
                <SignIn
                    signUpUrl="/signUp"
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-navOrange hover:bg-navOrange text-white",
                            card: "shadow-lg",
                            headerTitle: "text-white",
                            headerSubtitle: "text-white",
                            footerActionText: "text-white",
                            socialButtons: "gap-2 bg-mainBackground rounded-xl",
                            socialButtonsBlockButtonText: "text-white",
                            formFieldInputShowPasswordButton: "text-white",
                            formFieldInput: "bg-[#161616] text-white border-gray-600 focus:border-navOrange",
                            formFieldLabel: "text-white",
                            footerActionLink: "text-navOrange hover:text-orange-300"
                        },
                        variables: {
                            colorPrimary: "#F5972F",
                            colorBackground: "#2D2D2D",
                            colorText: "#FFFFFF",
                            colorInputBackground: '#161616'
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default SignInPage;