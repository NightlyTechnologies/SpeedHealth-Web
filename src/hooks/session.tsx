import React, {
  createContext,
  useState,
  useCallback,
  ChangeEvent,
  useContext,
} from 'react';

import { ibgeapi, mapquestapi } from '../services/api';

import { LeafletMouseEvent } from 'leaflet';

export type Modal = 'login' | 'signup';

interface MapGuestReturn {
  results: {
    locations: {
      latLng: {
        lat: number;
        lng: number;
      };
    }[];
  }[];
}

interface City {
  nome: string;
}

interface Data {
  modal: Modal;
  geolocationModal: boolean;
  cities: string[];
  selectedUf: string;
  selectedCity: string;
  selectedPosition: number[];
  geolocation: number[];
}

interface SessionContextData {
  data: Data;
  handleSignUpModal(): void;
  handleLoginModal(): void;
  handleOpenGeolocation(): void;
  handleCloseGeolocation(): void;
  handleSubmitGeolocation(): void;
  handleSelectUf(event: ChangeEvent<HTMLSelectElement>): Promise<void>;
  handleSelectCity(event: ChangeEvent<HTMLSelectElement>): Promise<void>;
  handleClickMap(event: LeafletMouseEvent): void;
}

const SessionContext = createContext<SessionContextData>(
  {} as SessionContextData,
);

export const SessionProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<Modal>('login');
  const [geolocationModal, setGeolocationModal] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);
  const [geolocation, setGeolocation] = useState([0, 0]);

  const handleSignUpModal = useCallback(() => {
    setModal('signup');
  }, []);

  const handleLoginModal = useCallback(() => {
    setGeolocationModal(false);
    setGeolocation([0, 0]);
    setSelectedPosition([0, 0]);
    setSelectedUf('');
    setCities([]);
    setSelectedCity('');
    setModal('login');
  }, []);

  const handleOpenGeolocation = useCallback(() => {
    setGeolocationModal(true);
  }, []);

  const handleCloseGeolocation = useCallback(() => {
    setGeolocationModal(false);
    setGeolocation([0, 0]);
    setSelectedPosition([0, 0]);
    setSelectedUf('');
    setCities([]);
    setSelectedCity('');
  }, []);

  const handleSubmitGeolocation = useCallback(() => {
    setGeolocationModal(false);
  }, []);

  const handleSelectUf = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedUf(event.target.value);

      const response = await ibgeapi.get(`${event.target.value}/municipios`);

      const IBGECities: City[] = response.data;

      const cityNames = IBGECities.map(city => city.nome);

      setCities(cityNames);
    },
    [],
  );

  const handleSelectCity = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(event.target.value);

      const response = await mapquestapi.get(
        `${event.target.value},${selectedUf}`,
      );

      const location: MapGuestReturn = response.data;

      const latitude = location.results[0].locations[0].latLng.lat;
      const longitude = location.results[0].locations[0].latLng.lng;

      setGeolocation([latitude, longitude]);
    },
    [selectedUf],
  );

  const handleClickMap = useCallback((event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        data: {
          modal,
          geolocationModal,
          cities,
          selectedUf,
          selectedCity,
          selectedPosition,
          geolocation,
        },
        handleSignUpModal,
        handleLoginModal,
        handleOpenGeolocation,
        handleCloseGeolocation,
        handleSubmitGeolocation,
        handleSelectUf,
        handleSelectCity,
        handleClickMap,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export function useSession(): SessionContextData {
  const context = useContext(SessionContext);

  return context;
}