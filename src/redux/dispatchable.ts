import {AppDispatch, RootState, store} from '.';

export type AsyncAction<T = any> = (
  dispatch: AppDispatch,
  getState: () => RootState,
) => Promise<T> | T;

export function dispatchable<
  TProviderFunction extends (...args: any[]) => AsyncAction<any>,
>(
  func: TProviderFunction,
): (
  ...funcArgs: Parameters<TProviderFunction>
) => ReturnType<ReturnType<TProviderFunction>> {
  return (...args: Parameters<TProviderFunction>) => {
    try {
      return store.dispatch(func(...args));
    } catch (err) {
      throw err;
    }
  };
}
