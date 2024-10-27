import { HttpError } from 'wasp/server'

export const getPlants = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const plants = await context.entities.Plant.findMany({
    where: { userId: context.user.id }
  });
  const today = new Date();
  return plants.map(plant => {
    const lastWatered = plant.lastWatered || new Date(0);
    const daysSinceLastWatered = Math.floor((today - lastWatered) / (1000 * 60 * 60 * 24));
    const daysUntilNextWatering = plant.wateringIntervalDays - daysSinceLastWatered;
    return {
      id: plant.id,
      name: plant.name,
      wateringIntervalDays: plant.wateringIntervalDays,
      lastWatered: plant.lastWatered,
      daysUntilNextWatering
    };
  });
}
