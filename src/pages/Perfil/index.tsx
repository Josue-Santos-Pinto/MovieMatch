import { useEffect, useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import {
  Container,
  HeaderArea,
  MenuArea,
  MenuBox,
  MenuText,
  PhotoInfo,
  PhotoOption,
  PhotoOptionText,
  Shadow,
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

export function Perfil() {
  const navigation = useNavigation();
  const [token, setToken] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [avatar, setAvatar] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { data, isLoading, isError } = useQuery(['userInfo', token, id], async () => {
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
  const launchGalery = async () => {
    try {
      const granted = await request(PERMISSIONS.ANDROID.CAMERA);
      if (granted === 'granted') {
        const options: ImageLibraryOptions = {
          mediaType: 'photo',
        };

        const result = await launchImageLibrary(options);

        if (result.assets) {
          setAvatar(result.assets[0].uri!);
          setModalVisible(false);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const launchPhotoByCamera = async () => {
    try {
      const granted = await request(PERMISSIONS.ANDROID.CAMERA);
      if (granted === 'granted') {
        const options: CameraOptions = {
          mediaType: 'photo',
          cameraType: 'front',
          quality: 1,
        };

        const result = await launchCamera(options);

        if (result.assets) {
          setAvatar(result.assets[0].uri!);
          setModalVisible(false);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log('TOKEN: ' + token);
  console.log('ID: ' + id);

  const menuPerfil = [
    { name: 'Favoritos', icon: 'star', screen: 'Favorite' },
    { name: 'Perfil', icon: 'user', screen: 'UserConfig' },
    { name: 'Configurações', icon: 'gear', screen: 'UserConfig' },
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
              <UserAvatarArea onPress={() => setModalVisible(true)}>
                {avatar ? (
                  <UserAvatar source={{ uri: avatar }} resizeMode="cover" />
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
          <ScrollView style={{ flex: 1 }}>
            <MenuArea>
              {menuPerfil.map((item, index) => (
                <MenuBox key={index}>
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
          <Modal transparent visible={modalVisible} animationType="fade">
            <Shadow onPress={() => setModalVisible(false)}>
              <PhotoInfo>
                <PhotoOption onPress={launchGalery}>
                  <PhotoOptionText>Galeria</PhotoOptionText>
                </PhotoOption>
                <PhotoOption onPress={launchPhotoByCamera}>
                  <PhotoOptionText>Camera</PhotoOptionText>
                </PhotoOption>
              </PhotoInfo>
            </Shadow>
          </Modal>
        </Container>
      )}
      {!isLoading && (!token || !id || isError) && <GoToLogin />}
      {isLoading && <Loading load={isLoading} />}
    </>
  );
}
