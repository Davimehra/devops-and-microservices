export default function ErrorRenderer({ err, ErrorContainerRef }) {
    if (!err?.response?.data?.message) {
        console.warn("UnKnown Error Occured", err)
    }
    const errorMessage = err?.response?.data?.message;
    const errorURL = err?.config?.baseURL + err?.config?.url || err?.request?.responseURL;
    ErrorContainerRef.current.style.display = 'block'
    ErrorContainerRef.current.style.visibility = 'visible'


    // For some delay
    const timmer = setTimeout(() => {
        ErrorContainerRef.current.style.display = 'none'
        ErrorContainerRef.current.style.visibility = 'hidden'
        clearTimeout(timmer)
    }, 4000);






    if (errorMessage) {
        ErrorContainerRef.current.innerText = `${import.meta.env.VITE_REACT_APP_NODE_ENV == 'dev' ? "URL - " + errorURL + '\n' : ''}` + "Error - " + errorMessage
    } else {
        const ht = document.createElement('html');
        ht.innerHTML = err?.response?.data;
        const body = ht.getElementsByTagName('body');
        const innerBody = body.item(0).innerHTML;
        ErrorContainerRef.current.innerHTML = innerBody;
    }
}