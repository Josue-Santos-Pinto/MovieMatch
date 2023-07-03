import styled from 'styled-components/native';

export const Item = styled.TouchableOpacity`
  min-width: 150px;
  min-height: 150px;
  max-height: 200px;
  border-radius: 30px;
  margin-horizontal: 6px;
  margin-vertical: 10px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ItemImg = styled.Image`
  width: 100%;
  height: 100%;
`;

export const StarsArea = styled.View`
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 8px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* From https://css.glass */
  background: rgba(0, 0, 0, 0.31);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.2px);
  -webkit-backdrop-filter: blur(4.2px);
  border: 1px solid rgba(0, 0, 0, 0.3);
`;
export const StarsText = styled.Text`
  color: #fff;
  margin-left: 8px;
`;
