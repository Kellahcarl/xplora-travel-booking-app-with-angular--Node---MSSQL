import ejs from "ejs";

import dotenv from "dotenv";

import { sendMail } from "../services/email";
import { query } from "../services/dbconnect";

dotenv.config();

export const welcomeUser = async () => {
  const users = (await query("SELECT * FROM users WHERE justRegistered = 1"))
    .recordset;

  console.log(users);

  for (let user of users) {
    ejs.renderFile(
      "templates/welcomeUser.ejs",
      { Name: user.name },
      async (error, data) => {
        let mailOptions = {
          from: process.env.EMAIL as string,
          to: user.email,
          subject: "Welcome Onboard",
          html: data,
        };

        try {
          await sendMail(mailOptions);

          await query(
            "UPDATE users SET justRegistered = 0 WHERE justRegistered = 1"
          );

          console.log("Emails send to new users");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};
