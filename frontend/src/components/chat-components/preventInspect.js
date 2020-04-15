function alertToClient() {
    alert('Inspect Element = blocked')
    return false 
}
function letterEncourter(j) {
    return j.charCodeAt(0)
}

export default function config() {
    document.onkeydown = e => {
        console.log(e)
        if(e.keyCode === 123) {
            return alertToClient()
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode === letterEncourter('I')) return alertToClient()
        if(e.ctrlKey && e.shiftKey && e.keyCode === letterEncourter('J')) return alertToClient()
        if(e.ctrlKey && e.shiftKey && e.keyCode === letterEncourter('C')) return alertToClient()

        if(e.metaKey && e.altKey && e.keyCode === letterEncourter('I')) return alertToClient()
        if(e.metaKey && e.altKey && e.keyCode === letterEncourter('J')) return alertToClient()
        if(e.metaKey && e.shiftKey && e.keyCode === letterEncourter('C')) return alertToClient()
        if(e.metaKey && e.altKey && e.keyCode === letterEncourter('C')) return alertToClient()
    }
    document.addEventListener('contextmenu', e => {
        e.preventDefault()
    }, false)
}