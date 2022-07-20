export default function apiCall(URL) {
    return fetch(URL).then(res => res.json()).then(data => {
        return data
    })
}
