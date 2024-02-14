import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";

const possibleProgress : {[key: string]:string[]} = {"A":["E","B","C"],"B":["A"],"C":["E","B"],"D":["E","X","Y"],"E":["F","B"],"F":["G","B"],"G":["I","H","J"],"H":["K","I"],"I":["L"],"J":["L"],"K":["L"],"L":["M","M"],"M":["N","X"],"N":["O","P"],"O":["T","U"],"P":["Q","S"],"Q":["S","R"],"R":[],"S":[],"T":[],"U":["T","V"],"V":["W","S"],"W":["Q","S"],"X":["N"]}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, ncp } = req.body

  try {
    const result = await sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`
    if (result.rows.length > 0) {
      const user = result.rows[0]
      let checkpoint = user.checkpoint;
      let history = user.history;
      if (ncp !== undefined) {
        if (ncp == "") {
          return res.status(200).json({ checkpoint: checkpoint })
        }
        if (possibleProgress[checkpoint].includes(ncp)) {
          checkpoint = ncp;
          history.push(ncp);
        } else {
          return res.status(400).json({ message: 'It is not possible to progress to '+ncp+' from '+checkpoint+'.', checkpoint: checkpoint })
        }
      } else {
        return res.status(200).json({ checkpoint: checkpoint })
      }
      await sql`UPDATE users SET checkpoint = ${checkpoint}, history = ${JSON.stringify(history)} WHERE username = ${username}`
      return res.status(200).json({ checkpoint: checkpoint })
    } else {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred: '+err })
  }
}