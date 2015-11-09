$(document).ready(function () {
    $(".introduction").find("img").click(function () {
        $(this).siblings(".div-uni").fadeIn(1, function () {//第一个参数为动画持续时间
            $(this).addClass('animated flipInY');//给当前元素添加摇晃效果类
        }).css("display","block");
    });
    $(".introduction").find(".div-uni").click(function () {
        $(this).slideUp("slow");
    });

    $(".intro").hover(function () {
        $(this).find(".bottom-line").fadeIn();
    }, function () {
        $(this).find(".bottom-line").fadeOut();
    });

    $(".con-back").interactive_bg({
        strength: 25,
        scale: 1.05,
        animationSpeed: "100ms",
        contain: true,
        wrapContent: false
    });
});