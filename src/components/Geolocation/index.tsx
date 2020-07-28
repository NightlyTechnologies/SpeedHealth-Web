import React from 'react';
import { FiX, FiMapPin, FiMap } from 'react-icons/fi';
import { IoMdPin } from 'react-icons/io';

import { useSession } from '../../hooks/session';

import Select from '../Select';
import Button from '../Button';
import Map from '../Map';

import mappromise from '../../assets/mappromise.png';

import {
  Container,
  BackButton,
  Title,
  TitleText,
  MapInputs,
  MapContainer,
  Unselect,
  UnselectText,
  MapButton,
  MapPromise,
} from './styles';

interface GeolocationProps {
  ufsInitials: string[];
}

const Geolocation: React.FC<GeolocationProps> = ({ ufsInitials }) => {
  const {
    data,
    handleCloseGeolocation,
    handleSelectUf,
    handleSelectCity,
    handleClickMap,
    handleSubmitGeolocation,
  } = useSession();

  return (
    <Container>
      <BackButton onClick={handleCloseGeolocation}>
        <FiX size={40} color="#22DAAE" />
      </BackButton>
      <Title>
        <IoMdPin size={50} color="#22DAAE" />
        <TitleText>Select the location of your pharmacy</TitleText>
      </Title>
      <MapInputs>
        <Select
          onChange={handleSelectUf}
          value={data.selectedUf}
          options={ufsInitials}
          placeholder="UF"
          icon={FiMapPin}
          width="20%"
        />
        <Select
          onChange={handleSelectCity}
          value={data.selectedCity}
          options={data.cities}
          placeholder="City"
          icon={FiMap}
          width="50%"
        />
      </MapInputs>
      <MapContainer>
        {data.geolocation[0] !== 0 ? (
          <>
            <Map
              onclick={handleClickMap}
              marker={data.selectedPosition}
              coordinates={data.geolocation}
            />
            {data.selectedPosition[0] === 0 ? (
              <Unselect>
                <UnselectText>
                  Click in the map to <br />
                  select your address!
                </UnselectText>
                <IoMdPin size={35} color="#22DAAE" />
              </Unselect>
            ) : (
              <MapButton>
                <Button
                  onClick={handleSubmitGeolocation}
                  text="Confirm location"
                  icon={IoMdPin}
                  width="41%"
                />
              </MapButton>
            )}
          </>
        ) : (
          <MapPromise src={mappromise} alt="MapPromise" />
        )}
      </MapContainer>
    </Container>
  );
};

export default Geolocation;