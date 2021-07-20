import React from 'react'

export const calendarEvent = ({event}) => {
    
    const {title, user} = event
    return (
        <div>
            <span>{title}</span>
            <strong>{user.name}</strong>
        </div>
    )
}
