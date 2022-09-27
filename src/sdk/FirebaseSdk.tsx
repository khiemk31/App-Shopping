class FirebaseSdk {
  static currentIntance: FirebaseSdk;
  static getInstance = () => {
    if (!this.currentIntance) {
      console.log('FirebaseSdk CREATE');
      this.currentIntance = new FirebaseSdk();
    }
    console.log('FirebaseSdk OLD');
    return this.currentIntance;
  };
}
export default new FirebaseSdk();
