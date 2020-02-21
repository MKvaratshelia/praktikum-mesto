
class UserInfo {
  constructor(userName, userInfo) {
    this.userName = userName;
    this.userInfo = userInfo;
  }
  setUserInfo(name,job) {
    this.userName.textContent = name;
    this.userInfo.textContent = job;
  }
  updateUserInfo(name,job) {
    this.setUserInfo(name,job);
  }
  defaultNameAndJob(inputName, inputJob, name, job) {
    inputName.value = name.textContent;
    inputJob.value = job.textContent;
  }
}

