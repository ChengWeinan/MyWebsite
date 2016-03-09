angular.module('service.globalFunction', []).factory('globalFunction', ['$filter', 'toaster',
    function($filter, toaster){
		//将数值形式的日期格式化
		function conventNumToDate(dateNum){
			var currentTime = new Date();  //当前时间
			var today = new Date();  //当天零点
			today.setHours(0);
			today.setMinutes(0);
			today.setSeconds(0);
			today.setMilliseconds(0);
			var oneday = 1000 * 60 * 60 * 24;	//一天的毫秒数
			if(currentTime.getTime() - dateNum < 60*1000){	//一分钟内
				return "刚刚";
			}else if(today.getTime() - dateNum <= 0){	//今天
				return "今天 " + $filter('date')(new Date(dateNum), "HH:mm:ss");
			}else if(today.getTime() - dateNum <= oneday){	//昨天
				return "昨天 " + $filter('date')(new Date(dateNum), "HH:mm:ss");
			}else if(today.getTime() - dateNum <= oneday * ((today.getDay() + 6)%7)){	//本周
				return "本周 " + $filter('date')(new Date(dateNum), "MM-dd HH:mm:ss");;
			}else if(today.getTime() - dateNum <= oneday * (today.getDate() - 1)){	//本月
				return "本月 " + $filter('date')(new Date(dateNum), "MM-dd HH:mm:ss");;
			}else{
				return $filter('date')(new Date(dateNum), "yyyy-MM-dd HH:mm:ss");
			}
		};
		
		//弹出消息框，支持类型：success、info、wait、warning、error
		function popMessage(type, title, message){
			toaster.pop(type, title, message);
		};
		
		return{
			conventNumToDate: conventNumToDate,
			popMessage: popMessage,
		};
}]);