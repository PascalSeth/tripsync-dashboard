import React from 'react'

function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='overflow-y-auto w-full h-full'>{children}</div>
  )
}

export default PageWrapper