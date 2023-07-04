import { RootAuthStackProps } from '../routes/AuthStack';
import { RootHomeStackProps } from '../routes/HomeStack';
import { RootMainStackProps } from '../routes/MainStack';
import { RootTabProps } from '../routes/MainTab';
import { RootSearchStackProps } from '../routes/SearchStack';

export declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootMainStackProps,
        RootHomeStackProps,
        RootSearchStackProps,
        RootAuthStackProps,
        RootTabProps {}
  }
}
