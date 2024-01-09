import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body

  try {
    const result = await sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`
    if (result.rows.length > 0) {
      const user = result.rows[0]
      return res.status(200).json({ checkpoint: user.checkpoint })
    } else {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred: '+err })
  }
}