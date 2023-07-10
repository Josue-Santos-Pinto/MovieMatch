import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(styled.TouchableOpacity``);

type ButtonProp = {
  isActive: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: #15141f;
  padding-horizontal: 15px;
`;
export const Scroller = styled.ScrollView``;
export const HeaderArea = styled.View`
  width: 100%;
  height: 60px;
  align-items: flex-start;
  margin-top: 25px;
  margin-bottom: 15px;
`;
export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 24px;
  font-family: Lato-Regular;
`;

export const SearchArea = styled.View`
  width: 90%;
  height: 48px;
  margin: 10px auto;
  background-color: #211f30;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
  border-radius: 20px;
`;
export const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  padding: 8px;
`;
export const FilterArea = styled.View`
  flex-direction: row;
`;
export const ItemArea = styled.TouchableOpacity`
  width: 50%;
  margin-horizontal: 15px;
  margin-vertical: 10px;
`;
export const ItemName = styled.Text<ButtonProp>`
  font-size: 16px;
  color: ${(props) => (props.isActive ? '#FF8F71' : '#fff')};
`;
export const ItemBar = styled.View`
  height: 5px;
  width: 50%;
  margin-top: 5px;
  border-radius: 20px;
  background-color: #ff8f71;
`;

export const MoviesList = styled.View`
  flex: 1;
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
