import {
  store,
  setupStore,
  useAppSelector,
  useAppDispatch,
} from "./Store/store";

import { onChengeStatusMessage } from "./Store/helpFuncs";

import type { AppDispatch, AppStore } from "./Store/store";

export {
  useAppDispatch,
  useAppSelector,
  setupStore,
  store,
  onChengeStatusMessage,
};

export type { AppDispatch, AppStore };
