import { createServerClient } from "@/utils/supabase-server";
import {cookies} from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const supabase = createServerClient();



export const GET = async (req: Request)  => {
    const cookieStore = cookies();
    const session = cookieStore.get('session');

    if(!session) {
        return NextResponse.json({success: false, error: '400 BAD REQUEST'});
    }

    const {user} = JSON.parse(session.value);
    try {
        const {data ,error} = await supabase
            .from('likes')
            .select('pokemon_id')
            .eq('user_id', user.id)

        if(error) throw error;

        const likedPokemonIds = data.map(item => item.pokemon_id);
        return NextResponse.json({success: true, likedPokemonIds});
    }catch(err) {
        console.log('Error fectching liked pokemon', err);
        return NextResponse.json({success: false, error: 'Internal Server Error'});
    }
}


export const POST = async (req: Request)  =>{
    const cookieStore = cookies();
    const session = cookieStore.get('session');

    if(!session) {
        return NextResponse.json({success: false, error: '400 BAD REQUEST'});
    }

    const {user} = JSON.parse(session.value);

    const res = await req.json();

    console.log(res);

    return NextResponse.json({ok: true});
}
