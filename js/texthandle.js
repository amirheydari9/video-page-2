// let text = document.querySelector(".video-text");
// let moreBtn = document.querySelector("#more");
// let str = text.innerHTML

// let str1 = str.slice(0,156);
// let str2 = str.slice(156);
// console.log(str1.length)

// text.innerHTML = str1 + '...';

// moreBtn.addEventListener("click" , function() {
//     text.innerHTML = str;
//     moreBtn.innerHTML=""
// })
function showMore(id){
    document.getElementById(id+'Overflow').className='';
    document.getElementById(id+'MoreLink').className='hidden';
}

// var len = 200;
// var shrinkables = document.getElementsByClassName('paragraph');
// if (shrinkables.length > 0) {
//     for (var i = 0; i < shrinkables.length; i++){
//         var fullText = shrinkables[i].innerHTML;
//         if(fullText.length > len){
//             var trunc = fullText.substring(0, len).replace(/\w+$/, '');
//             var remainder = "";
//             var id = shrinkables[i].id;
//             remainder = fullText.substring(len, fullText.length);
//             shrinkables[i].innerHTML = '<span>' + trunc + '<span class="hidden more" id="' + id + 'Overflow">'+ remainder +'</span></span>&nbsp;<a class="more" id="' + id + 'MoreLink" href="#!" onclick="showMore(\''+ id + '\');">بیشتر...</a>';
//         }
//     }
// }

var len = 200;
var shrinkables = document.getElementsByClassName('video-text');
$(window).resize(function () {
    if ($(window).width() < 576) {
        if (shrinkables.length > 0) {
            for (var i = 0; i < shrinkables.length; i++){
                var fullText = shrinkables[i].innerHTML;
                if(fullText.length > len){
                    var trunc = fullText.substring(0, len).replace(/\w+$/, '');
                    var remainder = "";
                    var id = shrinkables[i].id;
                    remainder = fullText.substring(len, fullText.length);
                    if(document.querySelector('.video-text').childElementCount == 0) {
                        shrinkables[i].innerHTML = '<span>' + trunc + '<span class="hidden more" id="' + id + 'Overflow">'+ remainder 
                        +'</span></span>&nbsp;<a class="more" id="' + id + 'MoreLink" href="#!" onclick="showMore(\''+ id + '\');">بیشتر...</a>';
                    }
                }
            }
        }  
    }
});


// $(window).resize(function () {
//     if($(window).width() < 768) {
//         let trunc = document.querySelectorAll('.side-left .side-left-section-title span');
//         trunc.forEach(item => {
//             item.classList.add('text-truncate');
//         })   
//     }
// })