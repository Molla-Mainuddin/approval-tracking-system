import React from 'react'

const AccessDenied = () => {
    return (
        <div className='w-full h-screen'>
            <div className='w-2/5 h-2/5 mx-auto mt-14'>
                <div className='w-full h-1/3 flex justify-center items-center'>
                    <div className='w-[12%] h-[75%] rounded-full flex justify-center items-center text-lg text-white font-bold bg-red-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className='mt-2 flex justify-center'>
                    <p className='text-gray-700 text-3xl font-semibold'>Access Denied</p>
                </div>
                <div className='mt-5 text-center'>
                    <p className='text-gray-700 text-lg font-semibold'>
                        You don't have permission to view this page. 
                    </p>
                    <p className='text-gray-700 text-lg font-semibold'>
                        Please check your credentials and try again. 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AccessDenied;