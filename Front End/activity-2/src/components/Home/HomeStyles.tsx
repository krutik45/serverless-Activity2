import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  padding: 16px 16px 16px 16px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 12px 12px 12px;
  width: calc(24.6% - 10px);
  height: 250px;
  aspect-ratio: 1;
  background-color: #fafafa;
  flex-grow: 0;
`;

export const ImageContainer = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const Image = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const UploadButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Listing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const RegisterButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: #1450a3;
  color: #fff;
  border: none;
  &:hover {
    background-color: #191d88;
  }
`;

export const ProductImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  width: 75px;
  border-radius: 50%;
  margin-top: 16px;
  border: 1px solid black;
`;
