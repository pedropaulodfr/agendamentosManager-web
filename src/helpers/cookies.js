import Cookies from 'js-cookie'
import React, { createContext } from 'react'

export const removeAllCookies = () => {
    Object.keys(Cookies.get()).forEach(function (cookie) {
        Cookies.remove(cookie)
    });
}

export const setSessionCookie = (session) => {
    Cookies.remove("sessionMedScan")
    Cookies.set("sessionMedScan", JSON.stringify(session), { expires: 14 })
}

export const getSessionCookie = () => {
    const sessionCookie = Cookies.get("sessionMedScan");
    if (sessionCookie === undefined)
        return null
    else
        return JSON.parse(sessionCookie)
}

export const SessionContext = createContext(getSessionCookie)