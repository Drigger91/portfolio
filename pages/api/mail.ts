import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
type Data = {
    message: string;
};
const mailer : string  = process.env.emailId || '';
const password : string = process.env.emailPass || '';
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
      user: mailer,
      pass: password
    },
  });
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const {
            name,
            email,
            message,
        }: { name: string; email: string; message: string } = req.body;
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
          return res.status(400).send({message : 'Please provide a valid emailId.'})
        }
        const msg = `<p><strong>Name:</strong> ${name}</p> <br>
        <p><strong>Email:</strong> ${email}</p> <br>
        <p><strong>Message:</strong> ${message}</p> <br>
      `
      try {
        await transporter.sendMail({
            from : mailer,
            to : mailer,
            subject : "Mail from portfolio",
            html : msg
        })
        return res.status(200).send({ message : "Mail sent successfully!!" })
      } catch (err) {
        console.log("error : " + err);
        return res.status(400).send({ message : "Mail did not sent!"});
      }
        
    }
}