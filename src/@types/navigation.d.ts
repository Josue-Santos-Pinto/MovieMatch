import { RootStackProps } from '../routes/HomeStack';
import { RootTabProps } from '../routes/MainTab';

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackProps, RootTabProps {}
  }
}
