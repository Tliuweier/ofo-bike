//index.js
//获取应用实例
const app = getApp()

Page({
  	data:{
  		userInfo:{
  			avatarUrl:"",
  			nickName:'未登录'
  		},
  		bType:"primary",
  		actionText:'登录',
  		lock:false
  	},
  	onLoad(){
  		let _this = this;
  		wx.setNavigationBarTitle({
  			title:'个人中心'
  		}),
  		//获取本地数据-用户信息
  		wx.getStorage({
  			key:'userInfo',
  			success(res){
  				wx.hideLoading();
  				_this.setData({
  					userInfo:{
  						avatarUrl:res.data.userInfo.avatarUrl,
  						nickName:res.data.userInfo.nickName
  					},
  					bType:res.data.bType,
  					actionText:res.data.actionText,
  					lock:true
  				})
  			}
  		})
  	},
  	movetoWallet(){
	    wx.navigateTo({
	      url: '../wallet/wallet'
	    })
	},
	bindAction(){
		let _this = this;
		this.data.lock = !this.data.lock
		if(this.data.lock){
			wx.showLoading({
				title:'正在登录'
			});
			wx.login({
				success: (res) => {
          wx.hideLoading();
          wx.getUserInfo({
            withCredentials: false,
            success: (res) => {
              this.setData({
                userInfo: {
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName
                },
                bType: "warn",
                actionText: "退出登录"
              });
              // 存储用户信息到本地
              wx.setStorage({
                key: 'userInfo',
                data: {
                  userInfo: {
                    avatarUrl: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName
                  },
                  bType: "warn",
                  actionText: "退出登录"
                },
                success: function(res){
                  console.log("存储成功")
                }
              })
            }     
          })
        }
      })
		}else{
			wx.showModal({
				title:'确认退出?',
				content:'退出后不能使用ofo',
				success(res){
					if (res.confirm) {
						console.log("确定");
						wx.removeStorageSync('userInfo')
						_this.setData({
			              userInfo: {
			                avatarUrl: "",
			                nickName: "未登录"
			              },
			              bType: "primary",
			              actionText: "登录"
			            })
					}else{
						console.log("cancel")
			            _this.setData({
			              lock: true
			            })
					}
				}
			})
		}
	}
})
