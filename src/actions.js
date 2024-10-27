import { HttpError } from 'wasp/server'

export const createPlant = async ({ name, wateringIntervalDays }, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Plant.create({
    data: {
      name,
      wateringIntervalDays,
      userId: context.user.id
    }
  })
}

export const waterPlant = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const plant = await context.entities.Plant.findUnique({
    where: { id: args.id },
    select: { userId: true } // Ensure we select userId for permission check
  });
  if (plant.userId !== context.user.id) { throw new HttpError(403) };

  const updatedPlant = await context.entities.Plant.update({
    where: { id: args.id },
    data: { lastWatered: new Date() }
  });

  return updatedPlant;
}
