import styled from 'styled-components/native';

type Props = {
  load: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: #15141f;
  padding-horizontal: 10px;
`;
export const Scroller = styled.ScrollView`
  flex: 1;
`;
export const HeaderArea = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-horizontal: 20px;
  margin-top: 20px;
`;

export const HeaderLogoText = styled.Text`
  color: #ff8f70;
  font-family: Lato-Italic;
  font-size: 25px;
`;

export const DailyMovie = styled.TouchableOpacity<Props>`
  width: 90%;
  height: 200px;
  border-radius: 30px;
  margin: 15px auto;
  overflow: hidden;
  border-width: ${(props) => (props.load ? '1px' : '0')};
  border-color: #bcbcbc;
`;
export const DailyMovieImg = styled.Image`
  width: 100%;
  height: 100%;
`;
export const DailyMovieInfo = styled.View`
  position: absolute;
  bottom: 5px;
  left: 10px;
  min-width: 200px;
  max-width: 90%;
  min-height: 80px;

  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical 10px;
  /* From https://css.glass */
  background: rgba(0, 0, 0, 0.39);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.8px);
  -webkit-backdrop-filter: blur(4.8px);
  border: 1px solid rgba(255, 255, 255, 0.23);
`;
export const DailyMovieReload = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 10px;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  /* From https://css.glass */
  background: rgba(0, 0, 0, 0.39);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.8px);
  -webkit-backdrop-filter: blur(4.8px);
  border: 1px solid rgba(255, 255, 255, 0.23);
`;
export const DailyMovieInfoText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
export const TrendingMoviesArea = styled.View`
  flex: 1;
`;
export const TrendingMoviesTitle = styled.Text`
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
`;
export const TrendingMovies = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
