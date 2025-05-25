import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-headerGray p-4">
            <div className="w-[full max-w-md]">
                <SignIn
                    appearance={{
                        elements: {
                        formButtonPrimary: "bg-orange-600 hover:bg-orange-700 text-white",
                        card: "shadow-lg border border-gray-200",
                        headerTitle: "text-gray-800",
                        headerSubtitle: "text-gray-600",
                        footerActionText: "text-gray-500",
                        socialButtons: "gap-2",
                        },
                        variables: {
                        colorPrimary: "#ea580c",
                        },
                    }}
                />
            </div>
        </div>
    );
};
  


export default SignInPage;