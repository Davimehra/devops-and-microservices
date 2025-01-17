export default function StatusRenderer({ message, StatusRef, displayColor = '#00E676' }) {
    if (!StatusRef?.current) { return }
    StatusRef.current.style.display = 'block'
    StatusRef.current.style.visibility = 'visible'
    StatusRef.current.style.setProperty('--displaycolor', displayColor)

    // For some delay
    const timmer = setTimeout(() => {
        StatusRef.current.style.display = 'none'
        StatusRef.current.style.visibility = 'hidden'
        clearTimeout(timmer)
    }, 4000);


    if (message) {
        StatusRef.current.innerText = message
    } else {
        StatusRef.current.innerText = "Successfully Request Handled"
    }
}