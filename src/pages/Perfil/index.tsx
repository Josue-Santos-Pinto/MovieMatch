import { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../components/Loading';

export function Perfil() {
  const navigation = useNavigation();
  const [token, setToken] = useState<string>('');
  const [id, setId] = useState<string>('');

  const { data, isLoading } = useQuery(['userInfo', token, id], async () => {
    if (token && id) {
      return await nodeApi.getUserInfo(id, token);
    }

    return null;
  });
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    navigation.reset({ index: 1, routes: [{ name: 'MainTab' }] });
  };

  console.log('TOKEN: ' + token);
  console.log('ID: ' + id);

  const menuPerfil = [
    { name: 'Favoritos', icon: 'star', screen: 'Favorite' },
    { name: 'Perfil', icon: 'user', screen: 'UserConfig' },
    { name: 'Perfil', icon: 'user', screen: 'UserConfig' },
  ];

  useEffect(() => {
    const getAsyncToken = async () => {
      let res = await AsyncStorage.getItem('token');
      if (res) setToken(res);
    };
    getAsyncToken();
  }, []);

  useEffect(() => {
    const getAsyncId = async () => {
      let res = await AsyncStorage.getItem('id');
      if (res) setId(res);
    };
    getAsyncId();
  }, []);

  return (
    <>
      {!isLoading && token && id && (
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
              <MenuBox onPress={handleLogout}>
                <FontAwesome5Icon name="sign-out-alt" size={35} color="#bcbcbc" />
                <MenuText>Sair</MenuText>
              </MenuBox>
            </MenuArea>
          </ScrollView>
        </Container>
      )}
      {!isLoading && (!token || !id) && <GoToLogin />}
      {isLoading && <Loading load={isLoading} />}
    </>
  );
}
