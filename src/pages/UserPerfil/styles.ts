import styled from 'styled-components/native';

type DataProps = {
  error?: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: #15141f;
`;

export const HeaderArea = styled.View`
  width: 100%;
  height: 250px;
  justify-content: center;
  align-items: center;
`;

export const AvatarArea = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  border: 1px solid #bcbcbc;
  background-color: #eee;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
export const ChangePhotoArea = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #bbb;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 90px;
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
export const Shadow = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

export const PhotoInfo = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background-color: #211f30;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;
export const PhotoOption = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  margin-vertical: 15px;
  justify-content: center;
  align-items: center;
`;
export const PhotoOptionText = styled.Text`
  font-size: 20px;
  font-family: Lato-Bold;
  color: #fff;
`;
