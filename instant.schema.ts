import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    users: i.entity({
      walletAddress: i.string().unique().indexed(),
    }),
  },
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema { }
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
