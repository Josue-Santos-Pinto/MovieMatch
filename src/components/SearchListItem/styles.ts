import styled from 'styled-components/native';

export const Container = styled.View`
  width: 50%;
  justify-content: center;
  align-items: center;
`
export const Item = styled.TouchableOpacity`

  width: 150px;
  height: 200px;
  max-height: 200px;
  border-radius: 30px;
  margin-horizontal: 10px;
  margin-vertical: 10px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
