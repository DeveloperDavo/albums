export default function pushToHistory(history, match, start, limit) {
  history.push(`${match.url}?start=${start}&limit=${limit}`)
}
