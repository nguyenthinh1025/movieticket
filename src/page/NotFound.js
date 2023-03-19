import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotFound () {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="px-4 lg:py-12">
                <div className="lg:gap-4 lg:flex">
                    <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                        <h1 className="font-bold text-blue-600 text-9xl">404</h1>
                        <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                            <span className="text-red-500">Oops!</span> Page not found
                        </p>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            The page you’re looking for doesn’t exist.
                        </p>
                        <NavLink to='/home' className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100">Go home</NavLink>
                    </div>
                    <div className="mt-4">
                        <img style={{ opacity: '1!important', width: '400px', height: 500 }} src='https://images.moviesanywhere.com/4677177f6f0595289bc3e767e7b47459/1d6c6c73-ab1e-4453-969c-6a4e965ebb37.jpg' alt="img" className="object-cover " />
                    </div>
                </div>
            </div>
        </div>


    )
}
