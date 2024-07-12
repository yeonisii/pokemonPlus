'use server';

import {cookies} from "next/headers";

export async function getUserCookie() {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('session')?.value;

    return userCookie|| null;
}