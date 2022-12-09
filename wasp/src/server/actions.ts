export const createTask = async (args: any, context: any) => {
  return context.entities.Task.create({
    data: {description: args.description}
  })
}
