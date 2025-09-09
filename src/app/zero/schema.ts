import {
  ANYONE_CAN,
  createSchema,
  definePermissions,
  enumeration,
  relationships,
  string,
  table,
} from "@rocicorp/zero";

export const user = table("user")
  .columns({
    id: string(),
    firstName: string(),
    lastName: string(),
  })
  .primaryKey("id");

export const task = table("task")
  .columns({
    id: string(),
    userId: string(),
    title: string(),
    status: enumeration<"todo" | "in_progress" | "done">(),
  })
  .primaryKey("id");

export const taskUser = relationships(task, ({ one }) => ({
  user: one({
    sourceField: ["userId"],
    destSchema: user,
    destField: ["id"],
  }),
}));

export const userTasks = relationships(user, ({ many }) => ({
  tasks: many({
    sourceField: ["id"],
    destSchema: task,
    destField: ["userId"],
  }),
}));

export const schema = createSchema({
  tables: [user, task],
  relationships: [userTasks, taskUser],
});

export type Schema = typeof schema;

type AuthData = {
  sub: string;
};

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
  return {
    task: {
      row: {
        select: ANYONE_CAN,
        insert: ANYONE_CAN,
        update: {
          preMutation: ANYONE_CAN,
          postMutation: ANYONE_CAN,
        },
        delete: ANYONE_CAN,
      },
    },
  };
});
