import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

const possibleProgress: { [key: string]: string[] } = {
  "0": ["1"],
  "1": ["2", "1a"],
  "1a": ["0"],
  "2": ["3", "2a"],
  "2a": ["0"],
  "3": ["4", "3a"],
  "3a": ["0"],
  "4": ["5", "6", "7", "8"],
  "5": ["9", "5a"],
  "5a": ["0"],
  "6": ["14", "6a"],
  "6a": ["0"],
  "7": ["19", "7a"],
  "7a": ["0"],
  "8": ["24", "8a"],
  "8a": ["0"],
  "9": ["10", "9a"],
  "9a": ["0"],
  "10": ["11", "10a"],
  "10a": ["0"],
  "11": ["12", "11a"],
  "11a": ["0"],
  "12": ["13", "12a"],
  "12a": ["0"],
  "14": ["15", "14a"],
  "14a": ["0"],
  "15": ["16", "15a"],
  "15a": ["0"],
  "16": ["17", "16a"],
  "16a": ["0"],
  "17": ["18", "17a"],
  "17a": ["0"],
  "19": ["20", "19a"],
  "19a": ["0"],
  "20": ["21", "20a"],
  "20a": ["0"],
  "21": ["22", "21a"],
  "21a": ["0"],
  "22": ["23", "22a"],
  "22a": ["0"],
  "24": ["25", "24a"],
  "24a": ["0"],
  "25": ["26", "25a"],
  "25a": ["0"],
  "26": ["27", "26a"],
  "26a": ["0"],
  "27": ["28", "27a"],
  "27a": ["0"],
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, ncp } = req.body;

  try {
    const result =
      await sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
    if (result.rows.length > 0) {
      const user = result.rows[0];
      let checkpoint = user.checkpoint;
      let history = user.history;
      if (ncp !== undefined) {
        if (ncp == "") {
          return res.status(200).json({ checkpoint: checkpoint });
        }
        if (
          possibleProgress[checkpoint].includes(ncp) ||
          username.startsWith("test")
        ) {
          checkpoint = ncp;
          history.push({ checkpoint: ncp, time: new Date() });
        } else {
          return res.status(400).json({
            message:
              "It is not possible to progress to " +
              ncp +
              " from " +
              checkpoint +
              ".",
            checkpoint: checkpoint,
          });
        }
      } else {
        return res.status(200).json({ checkpoint: checkpoint });
      }
      await sql`UPDATE users SET checkpoint = ${checkpoint}, history = ${JSON.stringify(history)} WHERE username = ${username}`;
      return res.status(200).json({ checkpoint: checkpoint });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "An error occurred: " + err });
  }
}
