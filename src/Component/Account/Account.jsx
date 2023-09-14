import React from 'react'
import Sidebar from './Sidebar'
import TopNavBar from './TopNavBar'

function Account() {
    return (
        <>
            <div className="account row g-0">
                <Sidebar />
                <TopNavBar />
            </div>
        </>
    )
}

export default Account