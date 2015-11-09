/**
 * Created by surongxiang on 15/11/7.
 */
var url = './js/report.json';
getNews(url);
function getNews(url) {
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        success: function (data) {
            var item = 10;
            initPagination(item);

            function handlePaginationClick(page_index, jq) {
                page_index++;
                $(".invest-list").empty();
                for (var i = (page_index - 1) * item; i <= page_index * item - 1 && i < data.news.length; i++) {
                    var tab = "<li title='" + data.news[i].aid + "'><span>" + data.news[i].time + "</span><a>" + data.news[i].title + "</a></li>";
                    $(".invest-list").append(tab);
                }

                return false;
            }

            /**
             * Initialisation function for pagination
             */
            function initPagination(ii) {
                // count entries inside the hidden content
                var num_entries = data.news.length;
                // Create content inside pagination element
                $(".searchresult_pagination").pagination(num_entries, {
                    items_per_page: ii,
                    num_edge_entries: 1,
                    callback: handlePaginationClick
                });
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}