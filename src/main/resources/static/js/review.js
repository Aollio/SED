/**
 * Created by 22340 on 2017/5/31.
 */
$(document).ready(function () {
    var $table = $("#reviewList").find("tbody");

    $.ajax({
        url: "/reviews",
        type: "get",
        data: {"token": getCookie("token"), "state": 0},
        success: function (result) {
            $table.find("tr").remove();
            //加载特效
            var _display = function (item) {
                var itemhtml = '<tr style="display: none" id="tr' + item.id + '">' +
                    '<td>' + item.id + '</td>' +
                    '<td>' + item.user.name + '</td>' +
                    '<td>' + item.time + '</td>' +
                    '<td class="myTable-operation-info icon-search" ' +
                    ' onclick=\'openPop_review(' + JSON.stringify(item) + ')\'></td>' +
                    '</tr>';
                // var itemhtml = "<tr style='display: none' id='tr" + item.id + "'>" +
                //     "<td>" + item.id + "</td>" +
                //     "<td>" + item.user.name + "</td>" +
                //     "<td>" + item.time + "</td>" +
                //     "<td class='myTable-operation-info icon-search' " +
                //     " onclick=\"openPop_review(\'" + JSON.stringify(item) + "\')\"></td>" +
                //     "</tr>";
                $table.append(itemhtml);
            };
            var _afterdisplay = function (item) {
                $("#tr" + item.id).fadeIn(500);
            };
            beautifyDisplay(_display, _afterdisplay, result.data, "reviewsList");
        },
        error: function () {
            alert("ajax请求发送失败");
        }
    })
});


function openPop_review(reviewString) {
    // var review = JSON.parse(reviewString);
    var review = reviewString;
    console.log(review);

    $(".pop li").css({"min-height": "3em", "line-height": "3em"});  //todo 弹出窗口样式

    $("#reviewId").val(review.id);
    $("#reviewId").text(review.id);
    $("#username").text(review.user.name);
    console.log(review.user.name);
    $("#userIdCard").text(review.user.idCard);
    // todo
    $("#userImage").text(review.user.photo);
    $("#remark").text(review.remark);
    $.ajax({
        url: "/credits/" + review.userId,
        type: "get",
        data: {"token": getCookie("token")},
        success: function (result) {
            console.log(JSON.stringify(result));
            if (result.status===200) {
                openPop();
                $("#creditValue").text(result.data.credit_value);
            } else {
                alert("查询详情出错");
            }
        },
        error: function () {
            alert("ajax请求发送失败");
        }
    });
}


function isAllowReview(isAllow) {
    if(isAllow===true){
        isAllow=1;
    }else if (isAllow===false){
        isAllow=2;
    }
    var reviewId = $("#reviewId").val();
    $.ajax({
        url:"/review/"+reviewId,
        type:"post",
        data:{
            "result": isAllow,
            "remark": $("#remark").val(),
            "token": getCookie("token")
        },
        success: function (result) {
            if (result.state===200) {
                closePop();
            } else {
                alert("出错");
            }
        },
        error: function () {
            alert("review isAllow ajax请求发送失败");
        }
    })
}