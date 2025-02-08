
import moment from "moment";

export const FormatToData = (data) => {
    return moment(data).format("DD/MM/YYYY");
}

export const FormatToFilter = (data) => {
    return moment(data).format("YYYY-MM-DD");
}

export const FormatToDataHora = (data) => {
    return moment(data).format("DD/MM/YYYY HH:mm");
}

export const FormatToHM = (data) => {
    return moment(data).format("HH:mm");
}

export const FormatToHMS = (data) => {
    return moment(data).format("HH:mm:ss");
}