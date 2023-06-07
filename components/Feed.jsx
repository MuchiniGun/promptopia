'use client'

import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
import PromptCard from './PromptCard'

// Creating this component here because it'll only be used in here
const PromptCardList = ({ data, handleTagClick }) => {
  {/*const { data:session} = useSession();*/}

  return (
    <div className='mt-16 prompt_layout'>
    
      {/* Fetch the data first */}
      {/* Now we'll map over the data and show the cards */}

      {/*{ session?.user ? (data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))) : 
      (<div className='opacity-30'>
        <div className='hidden sm:block'><h1>Sign in to see feed</h1></div>
        <div><h1>Sign in to see feed</h1></div>
        <div className='hidden xl:block'><h1>Sign in to see feed</h1></div>
      </div>)}*/}

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
  const [allPosts, setAllPosts] = useState([]);
  const { data:session} = useSession();

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    e.preventDefault(); // stop from refresh
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>

    {session?.user && (<form className='relative w-full flex-center'>
    <input
      type='text'
      placeholder='Search for a tag or a username'
      value={searchText}
      onChange={handleSearchChange}
      required
      className='search_input peer focus:none'
    />
  </form>)}
      

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;