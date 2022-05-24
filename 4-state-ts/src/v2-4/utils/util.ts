// TODO-gyu: loadsh clondeDeep 대체 또는 직접 만든 것 사용
export const cloneDeep = (x: any) => {
  return JSON.parse(JSON.stringify(x));
};

export const freeze = (state: any) => Object.freeze(cloneDeep(state));
