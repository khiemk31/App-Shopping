class IAPSdk {
  static currentIntance: IAPSdk;
  static getInstance = () => {
    if (!this.currentIntance) {
      console.log('IAPSdk CREATE');
      this.currentIntance = new IAPSdk();
    }
    console.log('IAPSdk OLD');
    return this.currentIntance;
  };
}
export default new IAPSdk();
