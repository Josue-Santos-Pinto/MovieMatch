import FastImage from 'react-native-fast-image';
import { IMG } from '../../keys';
import { ProviderItemType } from '../../models';
import { Container } from './styles';

type PropsType = {
  data: ProviderItemType;
};

export function ProviderItem({ data }: PropsType) {
  return (
    <Container>
      <FastImage style={{width: '100%', height: '100%'}} source={{ uri: `${IMG}${data.logo_path}` }} />
    </Container>
  );
}
