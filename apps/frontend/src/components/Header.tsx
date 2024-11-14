import { GiAstronautHelmet } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { UserButton } from '@clerk/clerk-react'

import Link from 'next/link'

const Header = (props) => {
  return (
    <div className="w-full bg-purple-600 py-4">
      <div className="mx-auto flex w-10/12 items-center justify-between">
        <Link href={'/'}>
          <a>
            <h4 className="flex items-center text-2xl font-bold text-white">
              <GiAstronautHelmet className="mr-4" />
              Clerk is Awesome
            </h4>
          </a>
        </Link>
        <div>
          <UserButton userProfileUrl="/profile" />
        </div>
      </div>
    </div>
  )
}

export default Header