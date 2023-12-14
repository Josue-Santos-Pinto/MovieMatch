import { useEffect } from 'react';
import { Container } from './styles';
import AnimatedLottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserActionTypes from '../../redux/user/actions-type';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export function Splash() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getAsyncInfo = async () => {
    let asyncToken = await AsyncStorage.getItem('token');
    dispatch({ type: UserActionTypes.SET_TOKEN, payload: asyncToken });
    let asyncId = await AsyncStorage.getItem('id');
    dispatch({ type: UserActionTypes.SET_ID, payload: asyncId });
  };

  useEffect(() => {
    setTimeout(() => {
      getAsyncInfo();
      navigation.reset({ index: 1, routes: [{ name: 'MainTab' }] });
    }, 3000);
  }, []);

  return (
    <Container>
      <AnimatedLottieView
        source={require('../../../assets/lottie/movie_animated.json')}
        autoPlay
        loop={false}
        style={{ marginHorizontal: 20 }}
      />
    </Container>
  );
}
