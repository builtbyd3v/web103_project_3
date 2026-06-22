import React from 'react'
import { formatDate, formatTime, formatRemainingTime } from '../services/dates'
import '../css/Event.css'

const Event = (props) => {
    const remaining = formatRemainingTime(props.date, props.time)

    return (
        <article className='event-information'>
            <img src={props.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.title}</h3>
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i> {formatDate(props.date)} <br /> {formatTime(props.time)}
                    </p>
                    <p className={remaining.isPast ? 'negative-time-remaining' : ''}>
                        {remaining.text}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Event
