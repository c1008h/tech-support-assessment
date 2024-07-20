"use client"
import React, { useState } from 'react'
import SideNav from '../SideNav'

export default function AuthenticatedLayout({ children 
}: {     
    children: React.ReactNode
}) {
    const [showNav, setShowNav] = useState<boolean>(true);

    return (
        <>
            <SideNav showNav={showNav} setShowNav={setShowNav} />
            <div className={`transition-transform duration-300 ${showNav ? 'ml-64' : 'ml-0'}`}>
                {children}
            </div>
        </>
    )
}