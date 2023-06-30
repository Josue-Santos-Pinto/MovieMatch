import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #15141f;
`;
export const Scroller = styled.ScrollView`
  flex: 1;
`;
export const BannerArea = styled.View`
  width: 100%;
  height: 287px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
`;
export const BannerImg = styled.Image`
  width: 100%;
  height: 100%;
`;
export const MovieInfo = styled.View`
  padding-horizontal: 20px;
`;
export const HeaderInfoArea = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #515151;
`;

export const TitleArea = styled.View`
  min-height: 50px;
  width: 100%;
  justify-content: center;
  margin-vertical: 10px;
  padding-horizontal: 5px;
`;
export const Title = styled.Text`
  font-size: 24px;
  font-family: Lato-Regular;
  color: #fff;
`;
export const MovieDetails = styled.View`
  min-width: 188px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
export const DurationArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
export const Duration = styled.Text`
  margin-left: 10px;
  font-size: 12px;
  color: #bcbcbc;
`;
export const RatedArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const Rated = styled.Text`
  margin-left: 10px;
  font-size: 12px;
  color: #bcbcbc;
`;

export const ReleaseArea = styled.View`
  flex: 1;
  min-height: 104px;
  flex-direction: column;
`;
export const ReleaseTitle = styled.Text`
  font-family: Lato-Bold;
  font-size: 16px;
  color: #fff;
  margin-top: 20px;
`;
export const ReleaseDate = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: #bcbcbc;
`;

export const GenresArea = styled.View`
  flex: 1;
  min-height: 104px;
  flex-direction: column;
`;
export const GenresTitle = styled.Text`
  font-family: Lato-Bold;
  font-size: 16px;
  color: #fff;
  margin-top: 20px;
`;
export const GenreList = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const GenreButton = styled.View`
  width: 60px;
  height: 25px;
  border-radius: 20px;
  background-color: #201f27;
  border: 1px solid #58575d;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
export const GenreButtonText = styled.Text`
  font-size: 12px;
  color: #c2c2c2;
`;

export const DescArea = styled.View`
  min-height: 100px;
  width: 100%;
  padding: 20px;
  align-items: center;
`;
export const DescText = styled.Text`
  color: #bcbcbc;
  font-size: 12px;
`;

export const RelatedMoviesArea = styled.View`
  flex: 1;
`;
export const RelatedMoviesTitle = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: Lato-Bold;
  margin-bottom: 15px;
`;
export const RelatedMovies = styled.View`
  flex: 1;
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
