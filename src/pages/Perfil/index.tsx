import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  HeaderArea,
  MenuArea,
  MenuBox,
  MenuText,
  UserAvatar,
  UserAvatarArea,
  UserCard,
  UserEmail,
  UserInfoArea,
  UserName,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { GoToLogin } from '../../components/GoToLogin';
import { useQuery } from 'react-query';
import nodeApi from '../../services/nodeApi';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export function Perfil() {
  const navigation = useNavigation();
  const { userKeys } = useSelector((rootReducer) => rootReducer.userReducer);

  const { data, isLoading } = useQuery(['userInfo', userKeys], async () => {
    if (userKeys.token && userKeys.id) {
      return await nodeApi.getUserInfo(userKeys.id, userKeys.token);
    }

    return null;
  });

  const menuPerfil = [
    { name: 'Favoritos', icon: 'star', screen: 'Favorite' },
    { name: 'Perfil', icon: 'user', screen: 'UserConfig' },
    { name: 'Perfil', icon: 'user', screen: 'UserConfig' },
  ];

  console.log(data);

  useEffect(() => {
    console.log(userKeys);
  }, [userKeys]);

  useEffect(() => {
    if (userKeys == '') {
      return navigation.navigate('AuthStack');
    }
  }, [userKeys]);
  return (
    <>
      {userKeys.token && !isLoading ? (
        <Container>
          <HeaderArea>
            <UserCard>
              <UserAvatarArea>
                <UserAvatar />
              </UserAvatarArea>
              <UserInfoArea>
                <UserName>{data.name}</UserName>
                <UserEmail>{data.email}</UserEmail>
              </UserInfoArea>
            </UserCard>
          </HeaderArea>
          <ScrollView style={{ flex: 1 }}>
            <MenuArea>
              {menuPerfil.map((item, index) => (
                <MenuBox key={index}>
                  <FontAwesome5Icon name={item.icon} size={35} color="#bcbcbc" />
                  <MenuText>{item.name}</MenuText>
                </MenuBox>
              ))}
              <MenuBox>
                <FontAwesome5Icon name="sign-out-alt" size={35} color="#bcbcbc" />
                <MenuText>Sair</MenuText>
              </MenuBox>
            </MenuArea>
          </ScrollView>
        </Container>
      ) : (
        <GoToLogin />
      )}
    </>
  );
}
