// Format helpers matching the example site: "Apr 14, 2023", "6:00 PM",
// and a countdown like "2 months, 8 days" (negative once the event has passed).

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

// Calendar months + days between the event and now.
// Returns { text, isPast }; text is negative once the event has passed,
// e.g. "-2 months, -8 days" (matches the example site).
const formatRemainingTime = (iso, time) => {
    if (!iso) return { text: '', isPast: false }

    const [year, month, day] = iso.split('T')[0].split('-').map(Number)
    const [hours, minutes] = (time || '00:00:00').split(':').map(Number)
    const target = new Date(year, month - 1, day, hours || 0, minutes || 0)
    const now = new Date()
    const isPast = target.getTime() < now.getTime()

    // Always measure the smaller date -> larger date, then sign it.
    const [from, to] = isPast ? [target, now] : [now, target]
    let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())
    let days = to.getDate() - from.getDate()
    if (days < 0) {
        months -= 1
        days += new Date(to.getFullYear(), to.getMonth(), 0).getDate() // days in month before `to`
    }

    const sign = isPast ? '-' : ''
    return { text: `${sign}${months} months, ${sign}${days} days`, isPast }
}

export { formatDate, formatTime, formatRemainingTime }
export default { formatDate, formatTime, formatRemainingTime }
