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
		wethar:[]
	},
	methods:{
		chageCity(e){
			console.log(e)
			require(
				{
					version:'v1',
					city:'回民'
				},
			'https://www.tianqiapi.com/api/').then(res=>{
				this.setData({
					wethar:res.data
				})
			})
			this.setData({
				region:e.detail.value,
				cityCode:e.detail.code,
			})
		}
	},
});

