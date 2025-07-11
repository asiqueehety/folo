export default function get_time_diff(content_lastused) {
    const dateString = content_lastused.date; // e.g., "2025-07-09"

    // Split the date string
    const [yearStr, monthStr, dayStr] = dateString.split("-");

    // Convert to numbers
    const year1 = Number(yearStr);
    const month1 = Number(monthStr);
    const date1 = Number(dayStr);
    var time1 = 0;
    if(content_lastused.time == "Midnight"){time1 = 3*3600;}
    else if(content_lastused.time == "Morning"){time1 = 8.5*3600;}
    else if(content_lastused.time == "Noon"){time1 = 13*3600;}
    else if(content_lastused.time == "Afternoon"){time1 = 16.5*3600;}
    else if(content_lastused.time == "Evening"){time1 = 19*3600;}
    else if(content_lastused.time == "Night"){time1 = 22*3600;}

    const time1_total = year1*365*24*3600 + month1*30*24*3600 + date1*24*3600 + time1;

    const currentDateAndTimeObject = getCurrentDateAndTimeObject();
    const year2 = currentDateAndTimeObject.year;
    const month2 = currentDateAndTimeObject.month;
    const date2 = currentDateAndTimeObject.day;
    const time2 = currentDateAndTimeObject.time;

    const time2_total = year2*365*24*3600 + month2*30*24*3600 + date2*24*3600 + time2;

    const timediff = time2_total - time1_total;

    const yeardiff = Math.floor(timediff / (365 * 24 * 3600));
    const monthdiff = Math.floor((timediff - (yeardiff * 365 * 24 * 3600))/(30*24*3600));
    const datediff = Math.floor((timediff - (yeardiff * 365 * 24 * 3600) - (monthdiff * 30 * 24 * 3600))/(24*3600));
    const hourdiff = Math.floor((timediff - (yeardiff * 365 * 24 * 3600) - (monthdiff * 30 * 24 * 3600) - (datediff * 24 * 3600))/(3600));
    const minutediff = Math.floor((timediff - (yeardiff * 365 * 24 * 3600) - (monthdiff * 30 * 24 * 3600) - (datediff * 24 * 3600) - (hourdiff * 3600))/(60));
    const seconddiff = timediff - (yeardiff * 365 * 24 * 3600) - (monthdiff * 30 * 24 * 3600) - (datediff * 24 * 3600) - (hourdiff * 3600) - (minutediff * 60);

    return {
        yeard: yeardiff,
        monthd: monthdiff,
        dated: datediff,
        hourd: hourdiff,
        minuted: minutediff,
        secondd: seconddiff,
        timediff: timediff
    };
}

function getCurrentDateAndTimeObject() {
    const now = new Date();

    // Format date as YYYY-MM-DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;


    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    return {
        time: totalSeconds,
        date: date,
        year: year,
        month: month,
        day: day
    };
}
