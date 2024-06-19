'use client'

import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
// import '@/styles/likeButton.css'
export const HeartButton: React.FC<{ slug: string }> = ({ slug }) => {
  const [show, setShow] = useState(false)
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    fetch(`/api/blog/like?slug=${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLikes(data.likes)
        setShow(true)
      })
      .catch((error) => console.error('Error:', error))
  }, [slug])

  const handleLike = () => {
    setLikes(likes + 1)
    setIsLiked(true)
    setTimeout(() => setIsLiked(false), 400)
    fetch('/api/blog/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })
  }

  return (
    <div
      className={`fixed bottom-8 left-8 z-50 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
    >
      <div className="flex flex-col items-center gap-2">
        {/* <button
          onClick={handleLike}
          className={`relative h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 transition-colors hover:from-red-600 hover:to-pink-600 ${
            isLiked ? 'animate-pulse' : ''
          }`}
        >
          <span className="animate-plus1 absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs text-white">
            +1
          </span>
          <HeartIcon
            className={`absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform text-white ${
              isLiked ? 'animate-heartbeat' : ''
            }`}
          />
        </button> */}

        <button
          className="duration-400 flex h-10 w-32 cursor-pointer items-center justify-center rounded-full border-8 border-solid border-red-200 bg-gray-200 p-5 px-6 font-mono text-lg font-extrabold text-gray-600 shadow-inner transition-transform ease-in-out hover:scale-105 hover:bg-gray-300"
          onClick={handleLike}
        >
          <svg
            height="32"
            width="32"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="empty mr-2 fill-red-500 transition-opacity duration-100 ease-in-out"
          >
            <path d="M0 0H24V24H0z" fill="none"></path>
            <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            className="filled absolute left-6 top-5 fill-red-500 opacity-0 transition-opacity duration-100 ease-in-out"
          >
            <path fill="none" d="M0 0H24V24H0z"></path>
            <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
          </svg>
          Like
        </button>
        <span className="text-gray-500 dark:text-gray-400">{likes} likes</span>
      </div>
    </div>
  )
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
