import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

const possibleProgress: { [key: string]: string[] } = {
  "0": ["1"],
  "1": ["2", "1a", "1b"],
  "1a": ["0"],
  "1b": ["1"],
  "2": ["3", "2a"],
  "2a": ["0"],
  "3": ["4", "3a", "3b"],
  "3a": ["0"],
  "3b": ["3"],
  "4": ["4a", "5"],
  "4a": ["0"],
  "5": ["6", "5a"],
  "5a": ["0"],
  "6": ["7", "6a"],
  "6a": ["0"],
  "7": ["8", "7a"],
  "7a": ["0"],
  "8": ["9", "8a"],
  "8a": ["0"],
  "9": ["10", "9a"],
  "9a": ["0"],
  "10": [],
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
          history.push(ncp);
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
