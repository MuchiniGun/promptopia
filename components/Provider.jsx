'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

{/* Higher order component that we'lll use to wrap other componenets with it*/}
{/* so have to render the children within the component */}
const Provider = ({ children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider