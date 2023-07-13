import { IMG } from '../../keys';
import { ProviderItemType } from '../../models';
import { Container, ProviderLogo } from './styles';

type PropsType = {
  data: ProviderItemType;
};

export function ProviderItem({ data }: PropsType) {
  return (
    <Container>
      <ProviderLogo source={{ uri: `${IMG}${data.logo_path}` }} />
    </Container>
  );
}
