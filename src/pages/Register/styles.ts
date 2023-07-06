import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

type DataProps = {
  error: boolean;
};

export const Container = styled.ImageBackground`
  flex: 1;
  width: ${Dimensions.get('screen').width}px;
  height: ${Dimensions.get('screen').height}px;
  background-color: #15141f;
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const BackButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 99;
`;

export const HeaderLogoArea = styled.View`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
`;

export const HeaderLogo = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const HeaderImg = styled.Image`
  width: 100%;
  height: 100%;
`;

export const InputBox = styled.View`
  width: 80%;
  margin: 15px auto;
`;

export const InputArea = styled.View<DataProps>`
  height: 50px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 15px;
  border: 3px solid ${(props) => (props.error ? 'red' : 'green')};
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  color: #000;
`;
export const ErrorMessage = styled.Text`
  color: red;
  font-size: 12px;
`;
export const SubmitButton = styled.TouchableOpacity`
  min-width: 130px;
  min-height: 40px;
  max-width: 200px;
  margin: 20px auto;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: #ff8f70;
  border: 1px solid #fff;
  padding-horizontal: 10px;
`;

export const SubmitButtonText = styled.Text`
  font-size: 20px;
  font-family: Lato-Bold;
  color: #fff;
`;

export const NotHaveAccountArea = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const NotHaveAccountText = styled.Text`
  font-size: 12px;
`;
export const GoToRegisterButton = styled.TouchableOpacity``;
