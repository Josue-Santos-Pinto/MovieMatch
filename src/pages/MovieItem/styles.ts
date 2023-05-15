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
  background-color: rgba(255, 255, 255, 0.2);
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
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
  padding-horizontal: 5px;
`;
export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
`;
export const DescArea = styled.View`
  min-height: 100px;
  width: 100%;
  padding: 20px;
  align-items: center;
`;
export const DescText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const WhereWatchArea = styled.View`
  min-height: 100px;
  width: 100%;
  padding: 20px;
  align-items: center;
`;
export const WhereWatchText = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
`;
export const ProviderArea = styled.View`
  width: 100%;
  height: 100px;
  margin-vertical: 20px;
`;
export const ProviderText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
export const ProviderImgArea = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ProviderImg = styled.Image`
  width: 60px;
  height: 60px;
`;
export const BackButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 99;
`;
