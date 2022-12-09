export const getTasks = async (args: any, context: any) => {
  return context.entities.Task.findMany({})
}
