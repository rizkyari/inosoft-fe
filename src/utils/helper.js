const month = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};

const getVal = {
  request_no:     r => r.request_no ?? '',
  location:       r => r.location ?? '',
  scope_of_work:  r => Array.isArray(r.scope_of_work) ? r.scope_of_work.join(', ').toLowerCase() : '',
  type:           r => r.type ?? '',
  date_submitted: r => {
    const m = (r.date_submitted||'').match(/^(\d{2})\s([A-Za-z]{3})\s(\d{2})$/);
    if (!m) return 0;
    return new Date(2000+Number(m[3]), month[m[2]]??0, Number(m[1])).getTime();
  },
  eco:            r => r.eco ?? '',
  related_to:     r => r.related_to ?? '',
  third_party_badge: r => Number(r.third_party_badge ?? 0),
  status:         r => r.status ?? '',
};

export function sortRows(base, key, dir = 'asc') {
  if (!key) return base
  const pick = getVal[key] ?? (r => r[key])
  const arr = [...base]
  arr.sort((a, b) => {
    let A = pick(a), B = pick(b)
    if (typeof A === 'string') A = A.toLowerCase()
    if (typeof B === 'string') B = B.toLowerCase()
    if (A < B) return dir === 'asc' ? -1 : 1
    if (A > B) return dir === 'asc' ?  1 : -1
    return 0
  })
  return arr
}