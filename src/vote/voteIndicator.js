import React from "react";
import { useState } from 'react'

export function VoteProgress({boxNumber, isActive}) {

    console.log(isActive)
    return (
        <div className="progBox" style={{backgroundColor: isActive ? 'green': 'white'}}>
            <h2>{boxNumber}</h2>
        </div>
    )
}