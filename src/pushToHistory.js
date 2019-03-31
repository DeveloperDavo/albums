export default function pushToHistory(history, match, start, limit) {
  history.push(`${match.path}?start=${start}&limit=${limit}`)
}
