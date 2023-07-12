import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {
  Avatar,
  AvatarArea,
  ChangePhotoArea,
  Container,
  ErrorMessage,
  HeaderArea,
  Input,
  InputArea,
  InputBox,
  PhotoInfo,
  PhotoOption,
  PhotoOptionText,
  Shadow,
  SubmitButton,
  SubmitButtonText,
} from './styles';
import { Modal } from 'react-native';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import nodeApi from '../../services/nodeApi';
import { NODE_API } from '../../keys';
import { useEffect, useState } from 'react';
import { PERMISSIONS, request } from 'react-native-permissions';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

type FormDataType = {
  name: string;
};

const signUpSchema = yup.object({
  name: yup
    .string()
    .required('O e-mail precisa ser informado')
    .min(5, 'O nome deve ter pelo menos 5 caracteres')
    .max(25, 'O nome deve ter no máximo 25 caracteres'),
});

export function UserPerfil() {
  const navigation = useNavigation();
  const { id, token } = useSelector((rootReducer: RootState) => rootReducer.userReducer);
  const [avatar, setAvatar] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(signUpSchema),
  });

  const { data, isLoading, isError } = useQuery(
    ['userInfo', token, id],
    async () => {
      if (token && id) {
        return await nodeApi.getUserInfo(id, token);
      }

      return null;
    },
    { refetchOnWindowFocus: 'always', staleTime: Infinity, cacheTime: 0, refetchInterval: 0 }
  );

  const handleUpdateUser = async (data: FormDataType) => {
    setLoading(true);
    let fData = new FormData();
    fData.append('name', data.name);
    await nodeApi.changeUserInfo(id, token, fData);
    navigation.navigate('Perfil');
    setLoading(false);
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
          let fData = new FormData();

          fData.append('avatar', {
            uri: result.assets[0].uri!,
            type: 'image/jpg',
            name: 'photo.jpg',
          });
          let res = await nodeApi.changeUserInfo(id, token, fData);
          setAvatar(res.updated.avatar);
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
          let fData = new FormData();

          fData.append('avatar', {
            uri: result.assets[0].uri!,
            type: 'image/jpg',
            name: 'photo.jpg',
          });
          let res = await nodeApi.changeUserInfo(id, token, fData);
          setAvatar(res.updated.avatar);
          setModalVisible(false);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data.name]);

  useEffect(() => {
    if (data && data.avatar) setAvatar(data.avatar);
  }, [data]);

  return (
    <Container>
      <HeaderArea>
        <AvatarArea>
          {avatar ? (
            <Avatar source={{ uri: `${NODE_API}/media/${avatar}` }} resizeMode="cover" />
          ) : (
            <FontAwesomeIcon name="user" size={90} color="#bcbcbc" />
          )}
          <ChangePhotoArea onPress={() => setModalVisible(true)}>
            <FontAwesomeIcon name="camera" size={30} color="#000" />
          </ChangePhotoArea>
        </AvatarArea>
      </HeaderArea>
      <InputBox>
        <InputArea error={errors.name?.message ? true : false}>
          <FontAwesomeIcon name="user" size={25} color="#bcbcbc" />
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nome"
                placeholderTextColor="#bcbcbc"
                onChangeText={onChange}
                maxLength={25}
              />
            )}
          />
        </InputArea>
        {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
      </InputBox>
      <InputBox>
        <InputArea>
          <FontAwesomeIcon name="envelope" size={25} color="#bcbcbc" />
          <Input value={data.email} editable={false} style={{ color: '#bcbcbc' }} />
        </InputArea>
      </InputBox>

      <SubmitButton onPress={handleSubmit(handleUpdateUser)}>
        <SubmitButtonText>Salvar</SubmitButtonText>
      </SubmitButton>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
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
  );
}
