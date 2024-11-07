import { SignedIn, UserButton } from '@clerk/clerk-react';

export default function AccountButton() {
    return (
        <>
            <SignedIn>
                <UserButton appearance={{ elements: { userButtonAvatarBox: { width: '35px', height: '35px' } } }} />
            </SignedIn>
        </>
    );
}