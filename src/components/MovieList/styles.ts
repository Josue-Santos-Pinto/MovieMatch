import styled from 'styled-components/native';

export const MoviesListArea = styled.View`
  flex: 1;
  margin-left: 15px;
  margin-top: 20px;
`;
export const MovieCatArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 35px;
`;
export const MovieCatName = styled.Text`
  font-size: 26px;
  color: #fff;
`;
export const MovieCatSeeMore = styled.Text`
  font-size: 16px;
`;
export const MovieItemArea = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 20px;
`;
export const Scroller = styled.ScrollView`
  flex: 1;
`;
export const MovieItem = styled.TouchableOpacity`
  height: 200px;
  width: 150px;
  border-radius: 10px;
  margin-right: 18px;
  overflow: hidden;
  background-color: red;
`;

export const MovieImg = styled.Image`
  width: 100%;
  height: 100%;
`;
