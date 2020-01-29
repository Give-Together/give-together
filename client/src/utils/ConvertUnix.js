function convertUnix(unixtimestamp) {
    // Months array
    var months_arr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    // Convert timestamp to millisecon)ds
    // var date = new Date(unixtimestamp);
    var date = new Date((Number(unixtimestamp) + 604800) * 1000);
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var convdataTime =
        month +
        "/" +
        day
    return convdataTime;
}

export { convertUnix };