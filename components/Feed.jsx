'use client'

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

// Creating this component here because it'll only be used in here
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {/* Fetch the data first */}
      {/* Now we'll map over the data and show the cards */}

      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  // updating the state with all the posts after fetching teh data
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  const handleTagClick = (e) => {

  }

  // Fetches the data from our own api as soon as the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data)
    }

    console.log(posts)

    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className="relatie w-full flex-center">
          <input 
            type="text" 
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
            />
      </form>

      <PromptCardList 
        // {/* parsing the fetched posts */}
        data={[posts]}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed