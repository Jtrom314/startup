import React from 'react';

import { Notification } from './websocket';

export function Players(props) {
    const userName = props.userName;

    const [events, setEvent] = React.useState([]);
    React.useEffect(() => {
        Notification.addHandler(QuestionEvent);
        return () => {
            Notification.removeHandler(QuestionEvent);
        }
    })

    function QuestionEvent(event) {
        setEvent([...events, event]);
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i, event] of events.entries()) {
            let message = event.value.msg;
            
            messageArray.push(
                <div key={i}>{message}</div>
            )
        }
        return messageArray;
    }
    return (
        <div>
            <div id="player-messages">{createMessageArray}</div>
        </div>
    )
}