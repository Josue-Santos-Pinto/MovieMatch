import { useNavigation } from '@react-navigation/native';
import { ScrollView, Alert, Modal } from 'react-native';
import {
  BackButton,
  Container,
  GoToRegisterButton,
  HeaderImg,
  HeaderLogo,
  HeaderLogoArea,
  Input,
  InputArea,
  NotHaveAccountArea,
  NotHaveAccountText,
  ErrorMessage,
  SubmitButton,
  SubmitButtonText,
  InputBox,
  Shadow,
  LoadingBox,
  LoadingText,
} from './styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import nodeApi from '../../services/nodeApi';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from '../../components/Loading';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';

type FormDataType = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};
const emailRegex = /^[\w.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const signUpSchema = yup.object({
  name: yup
    .string()
    .required('O nome precisa ser informado')
    .min(5, 'O nome deve ter pelo menos 5 caracteres')
    .max(25, 'O nome deve ter no máximo 25 caracteres')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word: string) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ');
    }),
  email: yup
    .string()
    .matches(emailRegex, 'Formato de e-mail inválido')
    .email('Formato de e-mail inválido')
    .required('O e-mail precisa ser informado'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 digitos'),
  password_confirm: yup
    .string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password')], 'As senhas precisam ser iguais'),
});

export function Register() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(signUpSchema),
  });

  const handleLogin = async (data: FormDataType) => {
    setIsLoading(true);
    let res = await nodeApi.register(
      data.name,
      data.email.toLowerCase(),
      data.password,
      data.password_confirm
    );
    if (!res.error) {
      if (res.status == true) {
        navigation.reset({ index: 1, routes: [{ name: 'Login' }] });
        setIsLoading(false);
        Alert.alert('Usuário criado com sucesso');
      }
    } else {
      console.log(res.error);
      setIsLoading(false);
      Alert.alert(res.error);
    }
  };

  return (
    <Container source={require('../../assets/cinema.jpg')} resizeMode="cover">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5Icon name="chevron-left" size={25} color="#fff" />
        </BackButton>

        <HeaderLogoArea>
          <HeaderLogo>
            <FastImage style={{width: '100%', height: '100%'}} source={require('../../assets/cinecam.png')} resizeMode={FastImage.resizeMode.cover} />
          </HeaderLogo>
        </HeaderLogoArea>

        <InputBox>
          <InputArea error={errors.name?.message ? true : false}>
            <FontAwesome5Icon name="user" size={25} color="#bcbcbc" />
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
          <InputArea error={errors.email?.message ? true : false}>
            <FontAwesome5Icon name="envelope" size={25} color="#bcbcbc" />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <Input placeholder="Email" placeholderTextColor="#bcbcbc" onChangeText={onChange} />
              )}
            />
          </InputArea>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputBox>

        <InputBox>
          <InputArea error={errors.password?.message ? true : false}>
            <FontAwesome5Icon name="lock" size={25} color="#bcbcbc" />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha"
                  placeholderTextColor="#bcbcbc"
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
          </InputArea>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </InputBox>

        <InputBox>
          <InputArea error={errors.password_confirm?.message ? true : false}>
            <FontAwesome5Icon name="lock" size={25} color="#bcbcbc" />
            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirmar Senha"
                  placeholderTextColor="#bcbcbc"
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
          </InputArea>
          {errors.password_confirm && (
            <ErrorMessage>{errors.password_confirm?.message}</ErrorMessage>
          )}
        </InputBox>

        <SubmitButton onPress={handleSubmit(handleLogin)}>
          <SubmitButtonText>Cadastrar-se</SubmitButtonText>
        </SubmitButton>

        <NotHaveAccountArea>
          <NotHaveAccountText>Já possui uma conta? </NotHaveAccountText>
          <GoToRegisterButton onPress={() => navigation.navigate('Login')}>
            <NotHaveAccountText style={{ fontSize: 15, color: '#fff', fontFamily: 'Lato-Bold' }}>
              Fazer Login
            </NotHaveAccountText>
          </GoToRegisterButton>
        </NotHaveAccountArea>
      </ScrollView>
      <Modal visible={isLoading} animationType="fade" transparent={true}>
        <Shadow>
          <LoadingBox>
            <Loading load={isLoading} color="blue" />
            <LoadingText>Carregando...</LoadingText>
          </LoadingBox>
        </Shadow>
      </Modal>
    </Container>
  );
}
