import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #15141f;
`;
export const HeaderArea = styled.View`
  width: 100%;
  height: 100px;
  justify-content: center;
  padding-horizontal: 15px;
  margin-top: 30px;
`;
export const UserCard = styled.View`
  width: 238px;
  height: 84px;
  border-radius: 40px;
  background-color: #rgba(255, 255, 255, 0.8);
  flex-direction: row;
  align-items: center;
  border: 1px solid #fff;
`;
export const UserAvatarArea = styled.View`
  margin-left: 10px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: blue;
`;
export const UserAvatar = styled.View`
  width: 100%;
  height: 100%;
`;
export const UserInfoArea = styled.View`
  flex: 1;
  margin-left: 10px;
`;
export const UserName = styled.Text`
  color: #000;
  font-size: 16px;
`;
export const UserEmail = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
`;
export const MenuArea = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
export const MenuBox = styled.TouchableOpacity`
  width: 40%;
  height: 150px;
  background-color: #211f30;
  border: 1px solid #fff;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
`;

export const MenuText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: #bcbcbc;
`;
