$(document).ready(function() {
	$(window).on("load",function(){
		imgLocation();
		var dataImg = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},]};
		window.onscroll = function(){
			if(scrollside()){
				$.each(dataImg.data,function(index, value) {
					var box = $("<div>").addClass('box').appendTo($("#container"));
					var content = $("<div>").addClass('content').appendTo(box);
					// console.log("./img"+$(value).attr('src'));
					$("<img>").attr('src',"./img/"+$(value).attr('src')).appendTo(content);
				});
				imgLocation();
			}
		};
	});
});

function scrollside(){
	var box = $(".box");
	var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);//get(0)的作用，将jquery对象（不能直接使用原生js的dom API，使用的是jquery的dom API）转换为dom对象（可以使用原生js的dom API，不能使用jquery的dom API）
	var documentHeight = $(document).height();
	var scrollHeight = $(window).scrollTop();
	return (lastboxHeight<scrollHeight+documentHeight)?true:false;
}

//要先确定一排能放多少张图片，然后第二排的第一张图片应该放在第一排的图片高度最小的图片下方。
function imgLocation(){
	var box = $(".box");//数组
	var boxWidth = box.eq(0).width();
	//获得每一个盒子的宽度，这样写的前提是等宽的
	var num = Math.floor($(window).width()/boxWidth);
	//取整，获得每一行可以放置多少图片
	var boxArr = [];//创建一个数组
	box.each(function(index,value){//jquery的each循环方式
		// console.log(index+"--"+value);
		if (index<num) {
			boxArr[index] = $(value).height();//先获取第一行所有盒子高度
		}else{
			var minboxHeight = Math.min.apply(null,boxArr);
			//apply和call的作用都是将函数绑定到另外一个对象上去运行
			// console.log(minboxHeight);
			var minboxIndex = $.inArray(minboxHeight, boxArr);
			//确定第一个参数在第二个参数（待处理数组）中的位置。(如果没有找到则返回-1)
			// console.log(minboxIndex);
			// console.log($(value));
			$(value).css({
				position: 'absolute',
				top: minboxHeight,
				left: box.eq(minboxIndex).position().left
			});
			boxArr[minboxIndex]+=$(value).height();//重新加载当前最小高度区域的高度
		}
	});
}