"use client";
import { useOrganization, useUser } from '@clerk/nextjs'
import React from 'react'
import {BarLoader} from 'react-spinners'

const UserLoading = () => {
    const {isLoaded} = useOrganization();
    const {isLoaded : isUserLoaded} = useUser();
    if(!isLoaded || !isUserLoaded){
        return <BarLoader className='mb-4' width={"100%"} color='#e5e7eb'/>
    }
    else <></>
}; 

export default UserLoading