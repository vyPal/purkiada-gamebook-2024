import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import "../../app/globals.css";
import { GrTest, GrMonitor } from "react-icons/gr";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Page({
  data,
  error,
}: {
  data: QueryResult<QueryResultRow>;
  error: Error;
}) {
  let [noTest, setNoTest] = useState(false);
  let [noEmpty, setNoEmpty] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-950 dark:bg-white text-white">
      <h1 className="text-4xl">Dashboard</h1>
      {error && <p>{error.message}</p>}
      <p>There are {data.rows.length} users in the database.</p>
      <p>
        {
          data.rows.filter(
            (row) =>
              !(noTest && row.type == "test") &&
              row.history.length != 1 &&
              row.checkpoint == "0",
          ).length
        }{" "}
        users gave up (are at the first checkpoint, even though they started the
        game)
      </p>
      <p>
        {
          data.rows.filter(
            (row) =>
              !(noTest && row.type == "test") &&
              ["13", "18", "23", "28"].includes(row.checkpoint),
          ).length
        }{" "}
        users reached an ending
      </p>
      <Button
        onClick={() => {
          setNoTest(!noTest);
        }}
        className="m-2 inline-block"
      >
        {noTest ? "Show test users" : "Hide test users"}
      </Button>
      <Button
        onClick={() => {
          setNoEmpty(!noEmpty);
        }}
        className="m-2 inline-block"
      >
        {noEmpty ? "Show empty users" : "Hide empty users"}
      </Button>
      <p>
        Rows after filter:{" "}
        {
          data.rows.filter(
            (row) =>
              !(noTest && row.type == "test") &&
              !(noEmpty && row.history.length == 1),
          ).length
        }
      </p>
      {data.rows
        .filter(
          (row) =>
            !(noTest && row.type == "test") &&
            !(noEmpty && row.history.length == 1),
        )
        .map((row) => (
          <RenderRow key={row.username} {...row} />
        ))}
    </div>
  );
}

function RenderRow(row: QueryResultRow) {
  let [open, setOpen] = useState(false);
  let startTime = new Date(
    row.history.filter(
      (c: any) => typeof c != "string" && c.time != null,
    )[0]?.time,
  );
  let endTime = new Date(
    row.history
      .filter((c: any) => typeof c != "string" && c.time != null)
      .at(-1)?.time,
  );
  let timeSpent = endTime.getTime() - startTime.getTime();
  return (
    <div key={row.username} className="m-2 p-2 border rounded shadow">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button>
            {row.type == "test" ? (
              <GrTest style={{ display: "inline" }} />
            ) : (
              <GrMonitor style={{ display: "inline" }} />
            )}
            <p style={{ display: "inline" }}>
              &nbsp;{row.username} is at PC {row.pc} on checkpoint{" "}
              {row.checkpoint}
            </p>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <h1 className="text-2xl">Details:</h1>
          <p>
            Finished:{" "}
            {["13", "18", "23", "28"].includes(row.checkpoint) ? "Yes" : "No"}
          </p>
          {["13", "18", "23", "28"].includes(row.checkpoint) ? (
            <p>Ending: {row.checkpoint}</p>
          ) : null}
          <p>History length: {row.history.length}</p>
          <p>
            Number of resets:{" "}
            {
              row.history.filter((c: any) =>
                typeof c == "string" ? false : c.checkpoint == "0",
              ).length
            }
          </p>
          <p>Opened at: {startTime.toTimeString().split(" ")[0]}</p>
          <p>Closed at: {endTime.toTimeString().split(" ")[0]}</p>
          <p>Time spent: {niceDuration(timeSpent)}</p>
          <h1 className="text-2xl">History:</h1>
          <ul>
            {row.history.map((checkpoint: any) => (
              <li key={checkpoint}>
                {typeof checkpoint == "string" ? (
                  <p>{checkpoint}</p>
                ) : (
                  <p>
                    {checkpoint.checkpoint} at{" "}
                    {new Date(checkpoint.time).toTimeString().split(" ")[0]}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function niceDuration(ms: number) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let output = "";
  if (hours > 0) {
    output += `${hours}h `;
  }
  if (minutes > 0) {
    output += `${minutes % 60}m `;
  }
  output += `${seconds % 60}s`;
  return output;
}

export async function getServerSideProps() {
  try {
    let res =
      await sql`SELECT username, checkpoint, history, pc, type FROM users ORDER BY type DESC`;
    return { props: { data: res } };
  } catch (err) {
    return { props: { data: null, error: err } };
  }
}
