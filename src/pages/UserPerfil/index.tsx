import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {
  Avatar,
  AvatarArea,
  ChangePhotoArea,
  CloseButton,
  Container,
  ErrorMessage,
  HeaderArea,
  Icon,
  IconButton,
  IconsArea,
  Input,
  InputArea,
  InputBox,
  ModalContainer,
  ModalTitle,
  SubmitButton,
  SubmitButtonText,
} from './styles';
import { Modal } from 'react-native';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import nodeApi from '../../services/nodeApi';
import { NODE_API } from '../../keys';
import { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

type FormDataType = {
  name: string;
};

const signUpSchema = yup.object({
  name: yup
    .string()
    .required()
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
    refetch,
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

  console.log(avatarIcon);

  const handleUpdateUser = async (data: FormDataType) => {
    setLoading(true);

    let res = await nodeApi.changeUserInfo(id, token, data.name, avatar);
    console.log(res);
    navigation.navigate('Perfil');
    setAvatar('');
    setLoading(false);
  };

  const changeAvatar = (item: string) => {
    setAvatar(item);
    setModalVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  

  return (
    <Container>
      <HeaderArea>
        <AvatarArea>
          {user && (
            <>
              {user.avatar && !avatar && (
                <FastImage
                style={{width: '100%', height: '100%', borderRadius: 90}}
                  source={{
                    uri: `${NODE_API}/${user.avatar}`,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}
              {avatar != '' && (
                <FastImage
                style={{width: '100%', height: '100%', borderRadius: 90}}
                  source={{
                    uri: `${NODE_API}/${avatar}`,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}

              {!avatar && !user.avatar && <FontAwesomeIcon name="user" size={90} color="#bcbcbc" />}
            </>
          )}

          <ChangePhotoArea onPress={() => setModalVisible(true)}>
            <FontAwesomeIcon name="pen" size={25} color="#000" />
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
    </Container>
  );
}
