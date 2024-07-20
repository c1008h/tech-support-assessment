import React from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from './icon';

interface SideNavProps {
    showNav:boolean;
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideNav({ showNav, setShowNav }: SideNavProps) {
    const pathname = usePathname()
    const toggleNav = () => setShowNav(!showNav);
    const isActive = (path: string) => pathname === path
    const linkStyles = (path: string) => `flex flex-row py-4 border-gray-700 font-bold ${isActive(path) ? 'active:text-slate-800' : 'hover:border-l'}`;

    return (
        <div className="fixed top-0 left-0 h-full z-10">
            <button
                type='button'
                onClick={toggleNav}
                className={`absolute top-1/2 z-30 bg-blue-500 text-white p-2 rounded-full 
                            transform -translate-y-1/2 transition-transform duration-300 ease-in-out
                            ${showNav ? 'left-64' : 'left-0'}`}
                aria-label="Toggle Navigation"
            >
                {showNav ? <ArrowLeft /> : <ArrowRight /> }
            </button>
            <nav 
                className={`${showNav ? 'translate-x-0' : '-translate-x-full'}
                absolute top-0 left-0 w-64 h-full
                border-r border-gray-300
                transition-transform duration-300 ease-in-out`}
            >
                <ul className='p-5'>
                    <Link href='/'>
                        <li className="flex flex-row py-4 text-2xl font-bold border-b border-gray-700">
                            Logo Goes Here
                        </li>
                    </Link>
                    <Link href='/'>
                        <li className={linkStyles('/overview')}>
                           Overview
                        </li>
                    </Link>
                    <Link href='/'>
                        <li className={linkStyles('/analytics')}>
                            Analytics
                        </li>
                    </Link>
                    <Link href='/'>
                        <li className={linkStyles('/clinic-referrals')}>Clinic Referrals</li>
                    </Link>
                    <Link href='/'>
                        <li className={linkStyles('/licenses')}>Licenses</li>
                    </Link>

                    <li className="border-t border-gray-300 my-4"></li>

                    <Link href='/'>
                        <li className={linkStyles('/help-center')}>Help Center</li>
                    </Link>
                    <Link href='/'>
                        <li className={linkStyles('/community')}>Community</li>
                    </Link>
                    <Link href='/'>
                        <li className={linkStyles('/settings')}>Settings</li>
                    </Link>
                    <Link href='/your-plan'>
                        <li className={linkStyles('/your-plan')}>Your Plan</li>
                    </Link>
                    <Link href='/'>
                        <li className={linkStyles('/logout')}>Logout</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}