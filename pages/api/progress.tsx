import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";

const possibleProgress : {[key: string]:string[]} = {
  "A": ["B", "C", "D"],
  "B": ["A", "C"],
  "C": ["A", "B"],
  "D": ["A"]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, ncp } = req.body

  try {
    const result = await sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`
    if (result.rows.length > 0) {
      const user = result.rows[0]
      let checkpoint = user.checkpoint;
      let history = user.history;
      if (ncp !== undefined) {
        if (ncp == "") {
          res.status(200).json({ checkpoint: checkpoint })
        }
        if (possibleProgress[checkpoint].includes(ncp)) {
          checkpoint = ncp;
          history.push(ncp);
        } else {
          res.status(400).json({ message: 'It is not possible to progress to '+ncp+' from '+checkpoint+'.', checkpoint: checkpoint })
        }
      } else {
        res.status(200).json({ checkpoint: checkpoint })
      }
      await sql`UPDATE users SET checkpoint = ${checkpoint}, history = ${JSON.stringify(history)} WHERE username = ${username}`
      res.status(200).json({ checkpoint: checkpoint })
    } else {
      res.status(401).json({ message: 'Invalid username or password' })
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred: '+err })
  }
}