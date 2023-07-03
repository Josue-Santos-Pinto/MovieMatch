import styled from 'styled-components/native';

type Props = {
  disabled: boolean;
};

export const PaginationArea = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const PrevPageButton = styled.TouchableOpacity<Props>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.disabled ? '#aaa' : '#fff')};
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;
export const Page = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #fff;
  margin-horizontal: 5px;
  justify-content: center;
  align-items: center;
`;
export const PageText = styled.Text`
  font-weight: bold;
  font-family: Lato-Black;
  color: #fff;
`;
export const NextPageButton = styled.TouchableOpacity<Props>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.disabled ? '#aaa' : '#fff')};
  margin-left: 10px;
  justify-content: center;
  align-items: center;
`;
