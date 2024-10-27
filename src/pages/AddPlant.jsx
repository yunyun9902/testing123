import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { createPlant } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const AddPlantPage = () => {
  const createPlantFn = useAction(createPlant);
  const [plantName, setPlantName] = useState('');
  const [wateringInterval, setWateringInterval] = useState('');

  const handleCreatePlant = () => {
    if (plantName && wateringInterval) {
      createPlantFn({ name: plantName, wateringIntervalDays: parseInt(wateringInterval) });
      setPlantName('');
      setWateringInterval('');
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Add a New Plant</h1>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Plant Name'
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          className='w-full px-3 py-2 border rounded mb-2'
        />
        <input
          type='number'
          placeholder='Watering Interval (days)'
          value={wateringInterval}
          onChange={(e) => setWateringInterval(e.target.value)}
          className='w-full px-3 py-2 border rounded mb-4'
        />
        <button
          onClick={handleCreatePlant}
          className='w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Plant
        </button>
      </div>
      <Link to='/' className='text-blue-500 hover:underline'>Back to Home</Link>
    </div>
  );
};

export default AddPlantPage;
