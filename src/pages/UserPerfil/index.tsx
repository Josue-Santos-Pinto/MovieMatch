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
    .min(5, 'O nome deve ter pelo menos 5 caracteres')
    .max(25, 'O nome deve ter no máximo 25 caracteres'),
});

export function UserPerfil() {
  const navigation = useNavigation();
  const { id, token } = useSelector((rootReducer: RootState) => rootReducer.userReducer);
  const [avatar, setAvatar] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fData = new FormData();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(
    ['userInfo', token, id],
    async () => {
      if (token && id) {
        return await nodeApi.getUserInfo(id, token);
      }

      return null;
    },
    { refetchOnWindowFocus: 'always', staleTime: Infinity, cacheTime: 0, refetchInterval: 0 }
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const handleUpdateUser = async (data: FormDataType) => {
    setLoading(true);

    if (avatar) {
      fData.append('avatar', {
        uri: avatar,
        type: 'image/jpg',
        name: 'photo.jpg',
      });
      let res = await nodeApi.changeUserInfo(id, token, fData);
      console.log(res);
      navigation.navigate('Perfil');
      setAvatar('');
      setLoading(false);
    }
    if (data.name != user.name) {
      fData.append('name', data.name);
      let res = await nodeApi.changeUserInfo(id, token, fData);
      navigation.navigate('Perfil');
      setLoading(false);
    }
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
          console.log(result.assets);
          setAvatar(result.assets[0].uri!);
          setModalVisible(false);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <HeaderArea>
        <AvatarArea>
          {user && (
            <>
              {user.avatar && !avatar && (
                <Avatar
                  source={{
                    uri: `${NODE_API}/media/${user.avatar}`,
                  }}
                  resizeMode="cover"
                />
              )}
              {avatar != '' && (
                <Avatar
                  source={{
                    uri: avatar,
                  }}
                  resizeMode="cover"
                />
              )}

              {!avatar && !user.avatar && <FontAwesomeIcon name="user" size={90} color="#bcbcbc" />}
            </>
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
            defaultValue={'Joao'}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                placeholderTextColor="#bcbcbc"
                onChangeText={onChange}
                maxLength={25}
                value={value}
              />
            )}
          />
        </InputArea>
        {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
      </InputBox>
      <InputBox>
        <InputArea>
          <FontAwesomeIcon name="envelope" size={25} color="#bcbcbc" />
          <Input value={user.email} editable={false} style={{ color: '#bcbcbc' }} />
        </InputArea>
      </InputBox>
      {fData && (
        <SubmitButton onPress={handleSubmit(handleUpdateUser)}>
          <SubmitButtonText>Salvar</SubmitButtonText>
        </SubmitButton>
      )}

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
