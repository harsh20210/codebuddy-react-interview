import React from 'react'
import notFound from "../Util/illustration.svg"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-[5px]">
       <img src={notFound} />
       <h1 className="font-semibold text-[30px]"> Sorry, the page you are looking for does not exist. </h1>
    </div>
  )
}
