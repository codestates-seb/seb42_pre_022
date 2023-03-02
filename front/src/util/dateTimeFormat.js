import { format } from "timeago.js";

const afterTwodays = 3 * 24 * 60 * 60 * 1000
function dateTimeFormat(date, ago) {
  if (!date) return;
  const postedDate = new Date(date + "Z")
  const nowDate = new Date()
  if (nowDate - postedDate <= afterTwodays || ago) return format(postedDate)
  else {
    const dateOpt = { month: "short", day: "numeric", timeZone: "UTC" }
    if (postedDate.getFullYear() !== nowDate.getFullYear()) dateOpt.year = "numeric"
    const changedDate = new Intl.DateTimeFormat('en-US', dateOpt).format(postedDate)
    const changedTime = new Intl.DateTimeFormat('en-US', { hour: "numeric", minute: "numeric", hour12: false, timeZone: "UTC" }).format(postedDate)
    return `${changedDate} at ${changedTime}`
  }
}

export default dateTimeFormat