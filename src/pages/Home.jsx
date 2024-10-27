import React from 'react';
import { useQuery, useAction, getPlants, waterPlant } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: plants, isLoading, error } = useQuery(getPlants);
  const waterPlantFn = useAction(waterPlant);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleWaterPlant = (id) => {
    waterPlantFn({ id });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Plants</h1>
      <div className="flex justify-end mb-4">
        <Link to="/add-plant" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Plant
        </Link>
      </div>
      {plants.map((plant) => (
        <div key={plant.id} className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg">
          <div>
            <div className="font-bold">{plant.name}</div>
            <div className="text-sm text-gray-600">{plant.daysUntilNextWatering} days until next watering</div>
          </div>
          <button
            onClick={() => handleWaterPlant(plant.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Water
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
