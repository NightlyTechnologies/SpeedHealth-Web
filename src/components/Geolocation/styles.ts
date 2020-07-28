import styled from 'styled-components';

export const Container = styled.div`
  background: var(--white);
  border-radius: 10px;
  width: 730px;
  height: 750px;
  margin-left: 25px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 10px 4px rgba(0, 0, 0, 0.25);
  position: relative;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleText = styled.h1`
  font-size: 2.3rem;
  margin-left: 10px;
`;

export const MapInputs = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 510px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MapPromise = styled.img`
  padding-bottom: 125px;
`;

export const MapButton = styled.div`
  position: absolute;
  bottom: 60px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  padding-right: 60px;
`;

export const Unselect = styled.div`
  position: absolute;
  bottom: 60px;
  right: 60px;
  width: auto;
  height: 60px;
  background: var(--white);
  border: 2px solid var(--primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px 0;
`;

export const UnselectText = styled.div`
  font-weight: bold;
  color: var(--primary);
  margin-right: 10px;
`;