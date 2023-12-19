import React from 'react'

const Banner2 = ({imgURL, imgURLMobile}) => {
  return (
    <div className="my-11">
      <img src={imgURL} alt="this a banner" className="hidden md:block w-screen object-contain h-[476px]"/>
      <img src={imgURLMobile} alt="this a banner" className="md:hidden w-screen object-contain h-[476px]"/>
    </div>
  )
}

export default Banner2