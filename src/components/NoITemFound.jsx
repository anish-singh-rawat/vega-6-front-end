import React from 'react'
import { Link } from 'react-router-dom';

const NoITemFound = ({title}) => {
    return (
        <div className='h-fit py-40'>
            <div className="text-center">
                <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
                <p className="mb-4  text-gray-600 text-2xl">No item in your {title}</p>
                <div className="animate-bounce">
                    <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                </div>
                <p className="mt-4 text-gray-600 text-2xl font-bold">Let's get you back
                    <Link to="/" className="text-blue-500">home</Link>.</p>
            </div>
        </div>
    )
}

export default NoITemFound