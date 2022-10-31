import dayjs from 'dayjs';


export function formatMonthDate(date, formatStr = "MM月DD日") {
    return dayjs(date).format(formatStr);
}

export function getDiffDate(startDate, endDate) {
    const daycount = dayjs(endDate).diff(startDate, "day");
    return daycount;
}