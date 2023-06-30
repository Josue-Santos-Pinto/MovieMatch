import styled from 'styled-components/native';

type Props = {
  size?: string;
};

export const Item = styled.TouchableOpacity<Props>`
  width: ${(props) => (props.size ? '150px' : '250px')};
  height: ${(props) => (props.size ? '250px' : '350px')};
  border-radius: 30px;
  margin: 10px;
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
