export default function dateFormat(toDate) {
    if (toDate > 599999) return "9:59.999";
    var date = new Date();
    date.setTime(toDate);
    return (
        date.getMinutes() +
        ":" +
        (date.getSeconds() < 10 ? "0" : "") +
        date.getSeconds() +
        "." +
        (date.getMilliseconds().toString().length >= 3
            ? date.getMilliseconds()
            : new Array(3 - date.getMilliseconds().toString().length + 1).join(
                  "0"
              ) + date.getMilliseconds())
    );
}
// export default function dateFormat(date) {
//     if (date.valueOf() > 599999) return "9:59.999";
//     return (
//         date.getMinutes() +
//         ":" +
//         (date.getSeconds() < 10 ? "0" : "") +
//         date.getSeconds() +
//         "." +
//         (date.getMilliseconds().toString().length >= 3
//             ? date.getMilliseconds()
//             : new Array(3 - date.getMilliseconds().toString().length + 1).join(
//                   "0"
//               ) + date.getMilliseconds())
//     );
// }
