'use client'

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
    const {data: session} = useSession();

    const [posts, setPosts] = useState([]);

    const router = useRouter();

    // Fetches the data from our own api as soon as the page loads
    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data)
        }

        

        if(session?.user.id) fetchPosts();
    }, [])

    const handleEdit = (post) => {
        // want to navigate the user to a page with form environement
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        
    }

    
  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts} // array of posts
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile