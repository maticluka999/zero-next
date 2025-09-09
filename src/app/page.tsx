"use client";

import { useQuery } from "@rocicorp/zero/react";
import { useZero } from "./zero/zero-provider";

const userId = "bc734f64-8be3-4b8c-b7b0-a67a12b24bd4";

export default function Home() {
  const z = useZero();
  const [tasks] = useQuery(z.query.task.where("userId", "=", userId));

  async function addTask() {
    const id = window.crypto.randomUUID();

    await z.mutate.task.insert({
      id,
      userId,
      title: `New task ${id}`,
      status: "todo",
    });
  }

  async function updateTaskStatus() {
    await z.mutate.task.update({
      id: tasks[0].id,
      status: "done",
    });
  }

  async function deleteTask() {
    await z.mutate.task.delete({
      id: tasks[0].id,
    });
  }

  return (
    <div>
      <div className="flex gap-2">
        <button
          className=" bg-amber-300 text-black p-2 cursor pointer"
          onClick={addTask}
        >
          add task
        </button>
        <button
          className=" bg-amber-300 text-black p-2 cursor pointer"
          onClick={updateTaskStatus}
        >
          update task status
        </button>
        <button
          className=" bg-amber-300 text-black p-2 cursor pointer"
          onClick={deleteTask}
        >
          delete task
        </button>
      </div>
      <pre className="m-3">{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}
