import React from 'react'
import { Link } from 'react-router-dom'

function WrongPath() {
    return (
        <div>
            <h1>WRONG PATH</h1>
            <Link to="/">GO BACK</Link>
        </div>
    )
}

export default WrongPath
