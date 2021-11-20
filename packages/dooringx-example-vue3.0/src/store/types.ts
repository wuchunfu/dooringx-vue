import settingStateTypes from './modules/Setting/types';
import appStateTypes from './modules/app/types';

export default interface RootStateTypes {
  count: Number
  // eslint-disable-next-line semi
}

export interface AllStateTypes extends RootStateTypes {
  settingsModule: settingStateTypes,
  appModule: appStateTypes
}
