import { DateTime } from 'luxon';

export default function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}



const units = [
    'year',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
];

export function timeAgo(seconds) {
    let dateTime = DateTime.fromSeconds(seconds)
    const diff = dateTime.diffNow().shiftTo(...units);
    const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';

    const relativeFormatter = new Intl.RelativeTimeFormat('nl', {
        numeric: 'auto',
    });
    return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};