import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

type ButtonProp = {
  active: boolean;
};

type ButtonScrollToTop = {
  scrollPosition: number;
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
  justify-content: space-around;
  align-items: center;
  padding-horizontal: 20px;
  margin-top: 20px;
`;
export const HeaderLogo = styled.View`
  height: 40px;
  justify-content: center;
  align-items: center;
`;
export const HeaderLogoText = styled.Text`
  color: #fff;
  font-family: Bruno Ace;
  font-size: 20px;
`;
export const HeaderSearch = styled.View`
  width: 200px;
  height: 60px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  padding: 10px;
  margin-left: 10px;
`;
export const HeaderSearchInputArea = Animated.createAnimatedComponent(styled.View`
  width: 160px;
  height: 60px;
  flex-direction: row;
  border-radius: 30px;
  background-color: #6b6d6c;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
`);
export const HeaderSearchInput = styled.TextInput`
  width: 120px;
  height: 100%;
  padding: 10px;
`;
export const HeaderSearchInputButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #6b6d6c;
  justify-content: center;
  align-items: center;
`;
export const GenresArea = styled.View`
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
  margin-vertical: 20px;
`;
export const GenresButton = styled.TouchableOpacity<ButtonProp>`
  padding: 8px;
  margin-horizontal: 8px;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => (props.active ? '#fff' : '#ccc')};
  height: 60px;
`;
export const GenresText = styled.Text<ButtonProp>`
  color: ${(props) => (props.active ? '#fff' : '#ddd')};
  font-size: 25px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
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
export const RandomMovieButtonArea = styled.View`
  height: 80px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const RandomMovieButton = styled.TouchableOpacity`
  width: 100px;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: #4764e6;
  border-radius: 5px;
`;
export const RandomMovieButtonText = styled.Text`
  color: #fff;
`;
