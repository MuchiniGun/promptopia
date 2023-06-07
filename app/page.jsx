
import Feed from '@components/Feed'
import { Analytics } from '@vercel/analytics/react'

const Home = () => {
  return (
    <>
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center"> AI-Powered Prompts </span>
        </h1>
        <p className="desc text-center">Promptopia is an open-source AI prompting tool for modern wolrd to discover, create and share creative prompts</p>
    
        <Feed />
    </section>
    <Analytics/>
    </>
  )
}

export default Home