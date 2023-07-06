import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #15141f;
`;
export const GoToLoginContainer = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${Dimensions.get('screen').width}px;
  height: ${Dimensions.get('screen').height - 60}px;
  background-color: #15141f;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
export const GoToLoginArea = styled.View`
  width: 90%;
  height: 50%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.31);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.2px);
  -webkit-backdrop-filter: blur(4.2px);
  border: 1px solid rgba(0, 0, 0, 0.3);
`;
export const GoToLoginButton = styled.TouchableOpacity`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: blue;
  margin-top: 20px;
`;
export const PageText = styled.Text`
  font-size: 14px;
  color: #fff;
`;
