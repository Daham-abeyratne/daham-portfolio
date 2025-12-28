import {NextResponse} from "next/server";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request){
    const {name, email, message } = await req.json();

    if(!name || !email || !message){
        return NextResponse.json(
            {error: "Missing fields"},
            {status: 400}
        );
    }

    await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["dahamabeyratney@gmail.com"],
        subject: `New Portfolio Message from ${name}`,
        replyTo: email,
        html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        `,
    });

    return NextResponse.json({success: true});
}