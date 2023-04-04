/*
function displayMessage( cls, from , msg) {
  const chatText = document.querySelector('#player-messages')
  chatText.innerHTML = `<div class="msg">${msg}</div>` + chatText.innerHTML;
}
*/

class EventMessage {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class NotificationSystem {
    events = [];
    handlers = [];
    constructor() {
        let port = window.location.port;
        if (process.env.NODE_ENV !== 'production') {
            port = 4000;
        }

        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            this.recieveEvent(new EventMessage('System', 'update', {msg: 'connected'}));
        }
        this.socket.onclose = (event) => {
            this.recieveEvent(new EventMessage('System', 'update', {msg: 'disconnected'}));
        }
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.recieveEvent(event)
            } catch {}
        };
    }

    broadcastEvent(from, type, value) {
        const event = new EventMessage(from, type, value);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    recieveEvent(event) {
        this.events.push(event);
        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            })
        })
    }
}

const Notification = new NotificationSystem();

export { Notification };