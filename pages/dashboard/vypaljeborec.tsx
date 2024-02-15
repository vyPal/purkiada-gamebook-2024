import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import "../../app/globals.css"
import { GrTest, GrMonitor } from "react-icons/gr"

export default function Page({ data, error } : { data: QueryResult<QueryResultRow>, error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-950 dark:bg-white text-white">
      {data.rows.map(row => 
        <div key={row.username}>
          {row.type == "test" ? <GrTest style={{"display": "inline"}}/> : <GrMonitor style={{"display": "inline"}}/>}
          <p style={{"display": "inline"}}>&nbsp;{row.username} is at PC {row.pc} on checkpoint {row.checkpoint} with {row.history} history</p>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  try {
    let res = await sql`SELECT username, checkpoint, history, pc, type FROM users ORDER BY type DESC`
    return { props: { data: res } }
  } catch (err) {
    return { props: { data: null, error: err } }
  }
}