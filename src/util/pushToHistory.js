export default function pushToHistory(history, url, start = 0, limit = 20) {
  history.push(`${url}?start=${start}&limit=${limit}`)
}
