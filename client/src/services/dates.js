// Format helpers matching the example site: "Apr 14, 2023" and "6:00 PM".

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "2026-07-18T04:00:00.000Z" -> "Jul 18, 2026"
// Parse the date part by hand to avoid timezone day-shift from new Date(iso).
const formatDate = (iso) => {
    if (!iso) return ''
    const [year, month, day] = iso.split('T')[0].split('-').map(Number)
    return `${MONTHS[month - 1]} ${day}, ${year}`
}

// "20:00:00" -> "8:00 PM"
const formatTime = (time) => {
    if (!time) return ''
    const [hours, minutes] = time.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`
}

export { formatDate, formatTime }
export default { formatDate, formatTime }
