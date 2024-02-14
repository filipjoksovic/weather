import { LoadingState } from './loading-state.enum';

export type LoadableDataInitial = {
  state: LoadingState.INITIAL;
};
export type LoadbleDataLoading = {
  state: LoadingState.LOADING;
};
export type LoadableDataLoaded<T> = {
  state: LoadingState.LOADED;
  data: T;
};
export type LoadableDataError = {
  state: LoadingState.ERROR;
};
export type LoadableDataEmpty = {
  state: LoadingState.EMPTY;
};
export type LoadableData<T> =
  | LoadableDataEmpty
  | LoadableDataError
  | LoadableDataInitial
  | LoadableDataLoaded<T>
  | LoadbleDataLoading;

export const initialLoadableDataState = (): LoadableDataInitial => ({
  state: LoadingState.INITIAL,
});
