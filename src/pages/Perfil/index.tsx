import { useCallback, useEffect, useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import {
  CloseButton,
  Container,
  HeaderArea,
  Icon,
  IconButton,
  IconsArea,
  MenuArea,
  MenuBox,
  MenuText,
  ModalContainer,
  ModalTitle,
  UserAvatar,
  UserAvatarArea,
  UserCard,
  UserEmail,
  UserInfoArea,
  UserName,
} from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { GoToLogin } from '../../components/GoToLogin';
import { useQuery } from 'react-query';
import nodeApi from '../../services/nodeApi';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../components/Loading';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import { NODE_API } from '../../keys';
import { RootState } from '../../redux/store';

type menuPerfilType = {
  name: string;
  icon: string;
  screen: any;
};

const menuPerfil: menuPerfilType[] = [
  { name: 'Favoritos', icon: 'star', screen: 'Favorites' },
  { name: 'Perfil', icon: 'user', screen: 'UserPerfil' },
  //{ name: 'Configurações', icon: 'gear', screen: 'UserConfig' },
];

export function Perfil() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id, token } = useSelector((rootReducer: RootState) => rootReducer.userReducer);
  const [avatar, setAvatar] = useState('');
  const [fetching, setFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    ['userInfo', token, id],
    async () => {
      if (token && id) {
        return await nodeApi.getUserInfo(id, token);
      }

      return null;
    },
    { refetchOnWindowFocus: 'always', staleTime: Infinity, cacheTime: 0, refetchInterval: 0 }
  );
  const { data: avatarIcon } = useQuery<string[]>(
    ['avatarIcon', token, id],
    async () => {
      if (token && id) {
        return await nodeApi.getImages(id, token);
      }

      return null;
    },
    { refetchOnWindowFocus: 'always', staleTime: Infinity, cacheTime: 0, refetchInterval: 0 }
  );
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    navigation.reset({ index: 1, routes: [{ name: 'MainTab' }] });
  };

  const changeAvatar = async (item: string) => {
    setAvatar(item);
    await nodeApi.changeUserInfo(id, token, data.name, item);
    setModalVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    if (data && data.avatar) setAvatar(data.avatar);
  }, [data]);

  return (
    <Container>
      {!isLoading && token && id && data && (
        <>
          <HeaderArea>
            <UserCard>
              <UserAvatarArea onPress={() => setModalVisible(true)}>
                {avatar ? (
                  <UserAvatar source={{ uri: `${NODE_API}/${avatar}` }} resizeMode="cover" />
                ) : (
                  <FontAwesomeIcon name="user" size={35} color="#bcbcbc" />
                )}
              </UserAvatarArea>
              <UserInfoArea>
                <UserName>{data.name}</UserName>
                <UserEmail>{data.email}</UserEmail>
              </UserInfoArea>
            </UserCard>
          </HeaderArea>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <MenuArea>
              {menuPerfil.map((item, index) => (
                <MenuBox key={index} onPress={() => navigation.navigate(item.screen)}>
                  <FontAwesomeIcon name={item.icon} size={35} color="#bcbcbc" />
                  <MenuText>{item.name}</MenuText>
                </MenuBox>
              ))}
              <MenuBox onPress={handleLogout}>
                <FontAwesomeIcon name="sign-out" size={35} color="#bcbcbc" />
                <MenuText>Sair</MenuText>
              </MenuBox>
            </MenuArea>
          </ScrollView>
          <Modal
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <ModalContainer>
              <ModalTitle>Selecione seu avatar</ModalTitle>
              <CloseButton onPress={() => setModalVisible(false)}>
                <FontAwesomeIcon name="times" size={30} color="#bcbcbc" />
              </CloseButton>
              <IconsArea>
                {avatarIcon &&
                  avatarIcon.map((item, index) => (
                    <IconButton key={index} onPress={() => changeAvatar(item)}>
                      <Icon source={{ uri: `${NODE_API}/${item}` }} />
                    </IconButton>
                  ))}
              </IconsArea>
            </ModalContainer>
          </Modal>
        </>
      )}
      {!isLoading && (!token || !id || isError) && <GoToLogin />}
      {isLoading && <Loading load={isLoading} color="#000" />}
    </Container>
  );
}
