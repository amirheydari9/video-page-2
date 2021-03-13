$(document).ready( function(){
    let comment = document.querySelector('.comment-row');
    let side = document.querySelector('.side-video');
    let parentRow = document.querySelector(".parentRow");
    let grandParent =document.querySelector('.grandParent');
    let btn = document.querySelector(".animated_btns");
    var media = mayPlayerWrapper.querySelector("video");

    $(window).resize(function () {
        if(media.currentTime != 0 ) {
            btn.style.display = "none";
        }
        orderElmContent()
    });

    function orderElmContent() {
        if ($(window).width() < 992) {
            parentRow.insertBefore( side ,comment);
        }else {
            grandParent.appendChild(side,parentRow)
        }
    }
    orderElmContent()
})

