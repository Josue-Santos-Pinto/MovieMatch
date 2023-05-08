import styled from 'styled-components/native';

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
export const HeaderAvatar = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
export const HeaderSearch = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
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
  margin-top: 20px;
`;
export const GenresButton = styled.TouchableOpacity<ButtonProp>`
  padding: 8px;
  background-color: ${(props) => (props.active ? '#4764e6' : '#ccc')};
  margin-horizontal: 8px;
  border-radius: 5px;
`;
export const GenresText = styled.Text<ButtonProp>`
  color: ${(props) => (props.active ? '#fff' : '#000')};
`;
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
