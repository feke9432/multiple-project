declare var $ : any;
import Cookies from 'js-cookie'

/**
 * API
 */
class AgentService {
  constructor(public sidKey : string, public userKey : string) {}

  /**
   * 请求API
   * @param {String} serviceName
   * @param {String} url
   * @param {Object} data
   * @param {Function} successCallBack
   * @param {Function} errorCallBack [可选]
   */
  Api(serviceName : string, url : string, data : any, successCallBack : any, errorCallBack : any) {
    let host = process.env.BASE_URL
    let action = url.replace(/([a-zA-Z])\//, '$1.')
    let apiURL = host + '/Api/' + serviceName + action
    let sid = Cookies.get(this.sidKey)
    console.log(sid)
    $.ajax({
      url: apiURL,
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: {
        "token": sid + ''
      },
      success: (response : any) => {
        if (response.IsSuccess) {
          successCallBack(response);
        } else {
          this.errorHandle(response, errorCallBack);
        }
      },
      error: () => {
        // console.error(error)
      }
    })
  }

  errorHandle(response : any, errorCallBack : any) {
    // 40002权限处理
    if ((response.ErrorCode === '40001') || (response.ErrorCode === '40000') || (response.ErrorCode === '0003')) {
      this.redirectToLogon();
    } else {
      errorCallBack && errorCallBack(response);
      // 默认错误信息消息框
      !errorCallBack && this.defaultErrorCB(response);
    }
  }

  /**
   * IsSuccess === false的默认回调函数
   * @param {any} response
   */
  defaultErrorCB(response : any) {
    // Message({   message: response.Message,   type: 'error',   duration: 2000 })
    alert(response.Message)
  }

  redirectToLogon() {
    // Message({   type: 'info',   message: '认证失败，3秒后自动跳转到登录页面',   duration: 3000 })
    alert('认证失败，3秒后自动跳转到登录页面')
    Cookies.remove(this.sidKey)
    Cookies.remove(this.userKey)
    // 重定向至登录
    setTimeout(() => {
      window.location.href = '/pages/login/login.html'
    }, 3000)
  }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    let oinfo:any = Cookies.get(this.userKey)
    let info = JSON.parse(oinfo)
    if (!info) {
      this.redirectToLogon();
      return ''
    } else {
      return info;
    }
  }
}

const agent = new AgentService('sid', 'uio');

export default agent;