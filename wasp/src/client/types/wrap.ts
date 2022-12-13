export type QueryWithTypes<Req, Resp> = (args: Req) => Promise<Resp>
