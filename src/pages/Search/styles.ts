import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(styled.TouchableOpacity``);

type ButtonProp = {
  active: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: #0a0a0a;
`;
export const Scroller = styled.ScrollView`
  flex: 1;
`;
export const HeaderArea = styled.View`
  width: 100%;
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  margin-top: 20px;
`;
export const HeaderAvatar = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
export const HeaderSearch = styled.View`
  width: 260px;
  height: 60px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  padding: 10px;
  margin-left: 10px;
`;
export const HeaderSearchInputArea = Animated.createAnimatedComponent(styled.View`
  width: 220px;
  height: 60px;
  flex-direction: row;
  border-radius: 30px;
  background-color: #6b6d6c;
  align-items: center;
`);
export const HeaderSearchInput = styled.TextInput`
  width: 150px;
  height: 100%;
  margin-left: 10px;
  padding: 10px;
`;
export const HeaderSearchInputButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #6b6d6c;
  justify-content: center;
  align-items: center;
`;
export const SearchResultArea = styled.View`
  width: 100%;
  height: 100px;
  flex-direction: column;
  align-items: center;
  padding-horizontal: 20px;
  margin-vertical: 20px;
`;
export const SearchResultText = styled.Text`
  font-size: 22px;
  color: #fff;
`;
export const SearchResultMovie = styled.Text`
  font-size: 28px;
  color: yellow;
  margin-left: 15px;
`;
export const ScrollToTopButton = Animated.createAnimatedComponent(styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: #6b6d6c;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  position: absolute;
  bottom: 20px;
  right: 20px;
`);

export const MoviesList = styled.View`
  flex: 1;
  padding: 10px;
`;
export const MovieBanner = styled.TouchableOpacity`
  width: 140px;
  height: 250px;
  margin-top: 10px;
  border-radius: 10px;
`;
export const NotFoundArea = styled.View`
  flex: 1;
  min-height: 300px;
  margin-top: -200px;
  justify-content: center;
  align-items: center;
`;
export const NotFoundText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
