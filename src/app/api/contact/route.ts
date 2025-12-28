import {NextResponse} from "next/server";

export async function POST(req: Request){
    const {name, email, message } = await req.json();

    if(!name || !email || !message){
        return NextResponse.json(
            {error: "Missing fields"},
            {status: 400}
        );
    }

    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

    console.log("New Contact message:", {name, email, message} );

    return NextResponse.json({success: true});
}