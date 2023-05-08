import styled from 'styled-components/native';

export const Item = styled.TouchableOpacity`
  width: 45%;
  height: 240px;
  border-radius: 5px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 0.5px solid #ccc;
`;

export const ItemImg = styled.Image`
  width: 100%;
  height: 100%;
`;

export const StarsArea = styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 8px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
`;
export const StarsText = styled.Text`
  color: #fff;
`;
