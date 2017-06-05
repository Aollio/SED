/**
 * Created by 22340 on 2017/6/5.
 */
$(document).ready(function () {
    $complaints = $("#complaints");
    $emptyComplaint = $(".message");


});


function complaints_TypeOf(type) {
    $title = $(".listNav-title").find("span");
    switch (type) {
        case 0:
            $title.text("超时");
            break;
        case 1:
            $title.text("未送达");
            break;
        case 2:
            $title.text("信息错误");
            break;
        case 3:
            $title.text("大小件判定");
            break;
        case 4:
            $title.text("其他");
            break;
    }

    $.ajax({
        url: "/complaints",
        type: "get",
        data: {"token": getCookie("token"), "state": type},
        success: function (result) {
            complaints = result.data;

            if (result.data.length === 0) {
                return;
            }
            $complaints.empty();
            //加载特效
            var _display = function (item) {
                var itemhtml =
                    '<div class="message effect4" id="' + '#tr' + item.id + '">' +
                    '<span class="message-title">申述单id: <strong>' + item.id + '</strong></span>' +
                    '<div class="message-content">提交者Id:' + item.userId + '</div>' +
                    '<div class="message-operation">' +
                    '<span onclick="popInfo('+item.id+')">操作</span>' +
                    '</div>' +
                    '</div>';
                $table.append(itemhtml);
            };
            var _afterdisplay = function (item) {
                $("#tr" + item.id).fadeIn(500);
            };
            beautifyDisplay(_display, _afterdisplay, result.data, "reviewsList");
        },
        error: function () {
            alert("complaints ajax请求发送失败");
        }
    })
}

function popInfo(id) {

}


