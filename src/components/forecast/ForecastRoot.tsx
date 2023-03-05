import { createContext } from 'react';
import ForecastDaily from './ForecastDaily';

export const context = createContext({ latitude: '0', longitude: '0' });

export interface ForecastRootProps {
  locationName: string;
  latitude: string;
  longitude: string;
}

function ForecastRoot({
  locationName,
  latitude,
  longitude,
}: ForecastRootProps) {
  return (
    <context.Provider value={{ latitude, longitude }}>
      <div className="mt-8 mb-16">
        <h1 className="text-xl md:text-2xl 2xl:text-4xl font-bold">
          {locationName}
        </h1>
        <ForecastDaily />
      </div>
    </context.Provider>
  );
}

export default ForecastRoot;
