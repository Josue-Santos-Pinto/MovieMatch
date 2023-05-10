import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #0a0a0a;
`;
export const Scroller = styled.ScrollView`
  flex: 1;
`;
export const BannerArea = styled.View`
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: red;
`;
export const BannerImg = styled.Image`
  width: 100%;
  height: 100%;
`;
export const HeaderSearch = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #6b6d6c;
  justify-content: center;
  align-items: center;
`;
export const TitleArea = styled.View`
  height: 80px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
`;
export const Title = styled.Text`
  font-size: 28px;
  color: #fff;
`;
