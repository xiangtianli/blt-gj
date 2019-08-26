var logisticsPlugin = requirePlugin('express');
import {expressArray, expressList} from "../../utils/constance"
import {getCollece} from "../../utils/cloud"
import {compare} from "../../utils/util"

Page({
	data: {
		title: '快递查询',
		expressArray,
		expressList,
		multiIndex:'',
		LogisticCode:'',
		ShipperCode:'',
		expressZh:'',
		expressInfo:null,
		collect:null,
		history:[]
	},

	setCode(e){
		this.setData({
			LogisticCode: e.detail.value,
		 })
	},
	//查询方法
	queryinfo(LogisticCode, ShipperCode, expressZh, history){
		const {collect} = this.data 
		logisticsPlugin.reglogis({
			LogisticCode,
			ShipperCode,
			appId:'1571077',
			appKey:'fd09b47a-a28f-4371-85df-401e46eb2efd',
			success :  (response)=> { 
			  	console.log('response', response)
				this.setData({
					expressInfo:response,
					LogisticCode:'',
					multiIndex:''
				})
				this.onShow()
				if(response &&response.Traces.length<1){
					wx.showToast({
						title: response.Reason,
						icon: 'none',
						duration: 1500
					})
				}
				!history && collect.add({
					// data 字段表示需新增的 JSON 数据
					data: {
						LogisticCode,
						ShipperCode,
						expressZh,
						date:new Date().getTime()
					},
					success:res=>{
						collect.get({
							success: res => {
								this.setData({
									history: res.data.sort(compare)
								}) 
							}
						})
					}
				})
			},
			error : function (error) { 
				wx.showToast({
					title: error,
					icon: 'none',
					duration: 1000
				})
			}
		})
	},
	//历史记录查询
	queryHistary(e){
		const {expressZh, ShipperCode, LogisticCode} =e.target.dataset.text
		this.queryinfo(LogisticCode,ShipperCode,expressZh, true)
	},
	//历史记录删除
	queryHistary(e){
		const {expressZh, ShipperCode, LogisticCode} =e.target.dataset.text
		this.queryinfo(LogisticCode,ShipperCode,expressZh, true)
	},
	//查询
	queryExpress(){
		const {LogisticCode, ShipperCode, expressZh} = this.data
		if(!LogisticCode){
			wx.showToast({
				title: '请先填写快递单号',
				icon: 'none',
				duration: 1000
			})
			return 
		}	
		if(!ShipperCode){
			wx.showToast({
				title: '请先选择快递公司',
				icon: 'none',
				duration: 1000
			})
			return
		}
		LogisticCode &&  ShipperCode &&this.queryinfo(LogisticCode, ShipperCode, expressZh)
	},

	//物流公司选择
	bindMultiPickerChange: function (e) {
		this.setData({
		 	multiIndex: e.detail.value,
		  	ShipperCode:expressList[expressArray[e.detail.value]],
			expressZh:expressArray[e.detail.value],

		})
	},
	onLoad(parmas) {
		this.setData({
			collect:getCollece('util-gm8h8','express-history')
		})
		
	},
	onShow(){
		const {collect} = this.data
		collect.get({
			success: res => {
			  const list =res.data
			  list.forEach(item=>{
				  if(new Date().getTime() - item.date>=86400000*7){
					  console.log(111)
					collect.doc(item._id).remove({
						success:res=>{
							console.log(res)
						  	this.setData({
							  history: res.data.sort(compare)
							}) 
						}
					});
				  }else{
					collect.get({
						success: res => {
							this.setData({
								history: res.data.sort(compare)
							}) 
						}
					})
				  }
			  })
			},
			fail: err => {
			  wx.showToast({
				icon: 'none',
				title: '查询记录失败'
			  })
			}
		})
	},
	
});
