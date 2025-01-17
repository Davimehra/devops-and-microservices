export default function consoleLog() {
    return (...AllMessages) => {
        if (import.meta.env.VITE_REACT_APP_NODE_ENV !== "prod") {
            let messages = '';
            if (AllMessages.length !== 1) {
                for (let message of AllMessages) {
                    messages += message + " "
                }
                console.log(messages.trim())
            }
            console.log(AllMessages[0])



        }
    }
}