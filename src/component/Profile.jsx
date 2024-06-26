import React from 'react'
import { useSelector } from 'react-redux';
export default function Profile() {
    const User=useSelector((state)=>state.user);
  return (
    <div></div>
  )
}
