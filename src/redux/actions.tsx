export const setReduxState = (state: any) => {
  return {
    type: 'SET_STATE',
    ...state,
  };
};
export const setBadge = (badge: number | undefined) => {
  return {
    type: 'SET_BADGE',
    badge: badge,
  };
};
