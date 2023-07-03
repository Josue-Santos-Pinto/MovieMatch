import { RootHomeStackProps } from '../routes/HomeStack';
import { RootTabProps } from '../routes/MainTab';
import { RootPerfilStackProps } from '../routes/PerfilStack';
import { RootSearchStackProps } from '../routes/SearchStack';

export declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootHomeStackProps,
        RootPerfilStackProps,
        RootSearchStackProps,
        RootTabProps {}
  }
}
