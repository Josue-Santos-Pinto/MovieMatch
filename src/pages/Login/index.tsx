import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
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
} from './styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import nodeApi from '../../services/nodeApi';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import UserActionTypes from '../../redux/user/actions-type';
import { loginUser } from '../../redux/user/actions';

type FormDataType = {
  email: string;
  password: string;
};

const signUpSchema = yup.object({
  email: yup
    .string()
    .required('O e-mail precisa ser informado')
    .email('Formato de e-mail inválido'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 digitos'),
});

export function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(signUpSchema),
  });

  console.log(errors);

  const handleLogin = async (data: FormDataType) => {
    let res = await nodeApi.login(data.email.toLowerCase(), data.password);
    if (!res.error) {
      if (res.token) {
        dispatch(loginUser({ token: res.token }));
        navigation.reset({ index: 1, routes: [{ name: 'MainTab' }] });
      }
    } else {
      console.log(res.error);
    }
  };

  return (
    <Container source={require('../../assets/cinema.jpg')} resizeMode="cover">
      <BackButton onPress={() => navigation.goBack()}>
        <FontAwesome5Icon name="chevron-left" size={25} color="#fff" />
      </BackButton>
      <ScrollView>
        <HeaderLogoArea>
          <HeaderLogo>
            <HeaderImg source={require('../../assets/cinecam.png')} resizeMode="cover" />
          </HeaderLogo>
        </HeaderLogoArea>

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

        <SubmitButton onPress={handleSubmit(handleLogin)}>
          <SubmitButtonText>Login</SubmitButtonText>
        </SubmitButton>

        <NotHaveAccountArea>
          <NotHaveAccountText>Não possui uma conta? </NotHaveAccountText>
          <GoToRegisterButton onPress={() => navigation.navigate('Register')}>
            <NotHaveAccountText style={{ fontSize: 15, color: '#fff', fontFamily: 'Lato-Bold' }}>
              Criar conta
            </NotHaveAccountText>
          </GoToRegisterButton>
        </NotHaveAccountArea>
      </ScrollView>
    </Container>
  );
}
