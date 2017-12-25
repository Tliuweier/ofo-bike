//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
  	//图片路径数组
  	picUrls:[],
  	//车编号和备注
  	inputValue:{
  		num:0,
  		desc:""
  	},
  	//类型数组
  	checkboxValue:[],
  	actionText:"拍照/相册",
  	btnBgc:"",
  	itemsValue:[
  		{
        checked: false,
        value: "私锁私用",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "车牌缺损",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "轮胎坏了",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "车锁坏了",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "违规乱停",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "密码不对",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "刹车坏了",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "其他故障",
        color: "#b9dd08"
      }
  	]
  },
  onLoad(e){
  	wx.setNavigationBarTitle({
  		title:'报障维修'
  	})
  },
  checkboxChange(e){
  	let _values = e.detail.value;
  	if (_values.length==0) {
  		this.setData({
  			btnBgc:''
  		})
  	}else{
  		this.setData({
  			checkboxValue:_values,
  			btnBgc:'#b9dd08'
  		})
  	}
  },
  numberChange(e){
  	this.setData({
  		inputValue:{
  			num:e.detail.value,
  			desc:this.data.inputValue.desc
  		}
  	})
  },
  descChange(e){
  	this.setData({
  		inputValue:{
  			num:this.data.inputValue.num,
  			desc:e.detail.value
  		}
  	})
  },
  formSubmit(e){
  	if(this.data.picUrls.length>0 && this.data.checkboxValue.length>0){
  		wx.request({
  			url:'https://easy-mock.com/mock/59c87b18e0dc663341b81e23/example/getmsg',
  			data:{

  			},
  			method:'get',
  			success(res){
  				wx.showToast({
  					title:res.data.data.msg,
  					icon:'success',
  					duration:2000
  				})
  			}
  		})
  	}else{
  		wx.showModal({
        title: "请填写反馈信息",
        content: '看什么看，赶快填反馈信息，削你啊',
        confirmText: "我我我填",
        cancelText: "劳资不填",
        success: (res) => {
          if(res.confirm){
            // 继续填
          }else{
            console.log("back")
            wx.navigateBack({
              delta: 1 // 回退前 delta(默认为1) 页面
            })
          }
        }
      })
  	}
  },
  bindCamera(e){
  	let _this = this;
  	wx.chooseImage({
  		count:4,
  		sizeType:['original','compressed'],
  		sourceType:['album','camera'],
  		success(res){
  			let tfps  = res.tempFilePaths;
  			let _picUrls = _this.data.picUrls;
  			for(let item of tfps){
  				_picUrls.push(item);
	            _this.setData({
		            picUrls: _picUrls,
		            actionText: "+"
		        });
  			}

  		}
  	})
  },
  delPic(e){
  	let index = e.target.dataset.index;
  	let _picUrls = this.data.picUrls;
  	_picUrls.splice(index,1);
  	this.setData({
  		picUrls:_picUrls
  	})
  }
})
