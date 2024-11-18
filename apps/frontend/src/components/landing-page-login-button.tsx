import {SignInButton, SignedOut} from '@clerk/clerk-react'

export default function LoginButton() {
    return (
        <div>
            <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                    <button className="shadow-lg bg-red-500 px-3 py-2 rounded-xl flex items-center hover:bg-red-400 hover:shadow-md">
                        <span className="border-gray-300 text-white text-2xl">SIGN IN TO GET STARTED</span>
                    </button>
                </SignInButton>
            </SignedOut>
        </div>
    )
}