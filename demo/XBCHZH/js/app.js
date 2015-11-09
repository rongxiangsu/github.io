/**
 * Created by surongxiang on 15/11/6.
 */

$(document).ready(function () {
    var str = "<div class='erwei'><img src='image/shouye/erwei.jpg'><p class='erwei-p'>APP下载</p></div>";
    $(".container-body").prepend(str);

});
var app = angular.module('growTogether', [
    'ngRoute'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './view/main.html'
        })
        .when('/share', {
            templateUrl: './view/share.html'
        })
        .when('/share/share-article', {
            templateUrl: './view/share-article.html'
        })
        .when('/investment', {
            templateUrl: './view/investment.html'
        })
        .when('/investment/investment-article', {
            templateUrl: './view/investment-article.html'
        })
        .when('/investment/investment-contact', {
            templateUrl: './view/investment-contact.html'
        })
        .when('/store', {
            templateUrl: './view/store.html'
        })
        .when('/help', {
            templateUrl: './view/help.html'
        })
        .when('/complain', {
            templateUrl: './view/complain.html'
        })
        .when('/promotion', {
            templateUrl: './view/promotion.html'
        })

}]);
