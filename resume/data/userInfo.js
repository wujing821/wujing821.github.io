
/*个人信息说明，数据格式为对象
	*   {
	*       userName: @value String               *         姓名
			userPortrait: @value String           *         头像
	*       jobWant: @value String                *         求职意向
	*       userQQ: @value String|Number          *         QQ号码
	*       userEmail: @value String              *         邮箱地址
	*       motto: @value String                  []         激励格言
	*       userPhone: @value String|Number       *          手机号码
	*       userOrignPlace: @value String         *         籍贯
	*       userSeatPlace: @value String          *         所在地
	*       userWeibo：@value String              []         微博地址
	*       userAssessment: @value String         []        自我评价
	*       userHobby: @value Array              []          爱好
	*       userAward:@value Array               []          奖项
	*
	*
	*   }
*/

var userInfo = {
    userName: "吴京" , 
    userPortrait:"images/icon/3.png",
    jobWant:  "WEB前端开发工程师",
    userQQ:  "250102331",
    userEmail:   "250102331@qq.com",
    motto:  "I am a slow walker, but I never walk backwards", 
    userPhone: 18810724186,
    userOrignPlace:  "湖南省" ,
    userSeatPlace:  "北京市",
    userWeibo: "<a href='https://wujing821.github.io/index'>https://wujing821.github.io/</a>",
    userAssessment: "熟悉各种JS技巧与实现，善于学习与钻研新技术，有团队协作能力，为人和善。",   
    userHobby: ["绘画(似颜绘)"]
}

