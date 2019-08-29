import {require} from '../../utils/require'
import {getCollece} from "../../utils/cloud"

Component({
	properties: {
		title: {
			type: String,
			value: 'tianqi Component',
		},
	},
	data:{
		region:[],
		cityCode:[],
		wethar:null,
		tianqiUrl:''
	},
	methods:{
		chageCity(e){
			console.log(e)
			require(
				{
					appid: 81981832,
					appsecret: "JnFFC61x",
					version:'v6',
					city:'回民'
				},
			'https://www.tianqiapi.com/api/').then(res=>{
				console.log(res)
				const tianqi = res.wea_img
				this.setData({
					wethar:res,
					tianqiUrl:`http://pwzssv5vh.bkt.clouddn.com/${tianqi}.png`
				})
			})
			this.setData({
				region:e.detail.value,
				cityCode:e.detail.code,
			})
			console.log(this.data.region)
		}
	},
});

