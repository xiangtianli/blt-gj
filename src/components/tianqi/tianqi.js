import {require} from '../../utils/require'
import {getCollece,getData,upData,addData} from "../../utils/cloud"
const collect = getCollece('util-gm8h8','weather')

Component({
	properties: {
		title: {
			type: String,
			value: 'tianqi Component',
		},
	},
	data:{
		region:'',
		wethar:[1,2],
		tianqiUrl:'',
		current:0,
		cityList:[],
	},
	lifetimes: {
		attached: function() {
			const {current} =this.data
			getData(collect,{}).then(res=>{
				const value=res.data[0]['cityArr'][1].slice(0,-1)
				this.queryWeath(value,current)
				if(res.data.length>0){
					this.setData({
						region:res.data[0]['cityArr']
					})
				}
				this.setData({
					cityList:res.data
				})
			})
		}
	},
	methods:{
		url(type){
			return `https://lxt-block.oss-cn-beijing.aliyuncs.com/icon/${type}/.png`
		},
		currentchange(e){
			const {cityList,wethar} =this.data
			const value=cityList[e.detail.current] && cityList[e.detail.current]['cityArr'][1].slice(0,-1)||''
			this.setData({
				current:e.detail.current,
				region:cityList[e.detail.current] && cityList[e.detail.current]['cityArr'] ||''
			})
			if(typeof wethar[e.detail.current] !=='object'){
				this.queryWeath(value,e.detail.current)
			}
		},
		//获取天气
		queryWeath(value,current){
			const {wethar} =this.data
			require({appid: 81981832, appsecret: "JnFFC61x", version:'v1',city:value},'https://www.tianqiapi.com/api/').then(res=>{
				const tianqi = res.wea_img
				wethar[current] =res.data
				this.setData({
					wethar,
					tianqiUrl:`https://lxt-block.oss-cn-beijing.aliyuncs.com/icon/${tianqi}.png`
				})
			})
		},
		chageCity(e){
			const value=e.detail.value[1].slice(0,-1)
			const {current,cityList} =this.data
			if(cityList.length>current){
				upData(collect,cityList[current]['_id'],{
					cityArr:e.detail.value,
				}).then(res=>{
					getData(collect,{}).then(res=>{
						this.setData({
							cityList:res.data
						})
					})
				})
			}else{
				addData(collect,{
					cityArr:e.detail.value,
					idx:current
				}).then(res=>{
					getData(collect,{}).then(res=>{
						this.setData({
							cityList:res.data
						})
					})
				})
			}
			this.queryWeath(value,current)
			this.setData({
				region:e.detail.value,
			})
		}
	},
});

