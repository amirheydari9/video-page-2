var mayPlayerWrapper = document.getElementsByClassName("myplayer")[0];
var lastVal;

const controlsHtml = `
    <div class="controls__progressbar">
        <input class="controls__progressbar-current" type="range" min="1" max="100" step="1" value="0" />
        <div class="seek-tooltip" id="seek-tooltip">00:00</div>
    </div>
    <div class="controls__btns">
        <div class="left">
            <div class="btns play">
                <img src="./img/play.svg" alt=""/>
            </div>
            <div class="pause">
                <img src="./img/pause.svg" alt=""/>
            </div>
            <div class="btns rewind">
                <img src="./img/rewind.svg" alt=""/>
            </div>
            <div class="btns forward">
                <img src="./img/fast-forward.svg" alt=""/>
            </div>
            <div class="btns volume">
                <img src="./img/volume.svg" alt="" class="volume_icon ">
                <img src="./img/mute1.svg" alt="" class=" mute">
                <div class="volume__progress ml-2">
                    <input id="volume_bar" type="range" min="1" max="100" step="1" value = "50" />
                </div>
            </div>
            <div class="timer">
                <span class="currentTime">00:00</span>
                <span class="time_divider">/</span>
                <span class="videoTime" >00:00</span>
            </div>
        </div>
        <div class="right">
            <div class=" btns pic">
                <img src="./img/Pic_in_pic.svg" alt=""/>
            </div>
            <div class="btns setting">
                <img src="./img/Setting.svg" alt=""/>
                <ul class="speed">
                  <li class="speed_rate_item">2X</li>
                   <li class="speed_rate_item">1.5X</li>
                   <li class="active speed_rate_item">1X</li>
                   <li class="speed_rate_item">0.5X</li>
                </ul>
            </div>
            <div class="btns theater" >
                <a href="#player">
                <img src="./img/Wide.svg" alt=""/>
                </a>
            </div>
            <div class="btns fullscreen">
                <img class="icon" src="./img/Fullscreen.svg" alt=""/>
            </div>
        </div>
    </div>`;
let controlWrapper = document.createElement('div');
controlWrapper.innerHTML = controlsHtml;
controlWrapper.classList.add("myplayer__controls");
mayPlayerWrapper.appendChild(controlWrapper);

var controls = mayPlayerWrapper.querySelector(".myplayer__controls");
var media = mayPlayerWrapper.querySelector("video");
var play = controls.querySelector(".play");
var pause = controls.querySelector(".pause");
var rwd = controls.querySelector(".rewind");
var fwd = controls.querySelector(".forward");
var timer = controls.querySelector(".timer");
var current_time = timer.querySelector(".currentTime");
var video_time = timer.querySelector(".videoTime");
var time_divider = timer.querySelector(".time_divider");
var input = controls.querySelector(".controls__progressbar-current");
var volume = controls.querySelector(".volume");
var volume_icon = volume.querySelector(".volume_icon");
var mute_icon = volume.querySelector(".mute");
var volume_progress = volume.querySelector(".volume__progress");
var input_volume = volume_progress.querySelector("input");
var fullscreen_icon = controls.querySelector(".fullscreen .icon");
var setting = mayPlayerWrapper.querySelector(".setting");
var controls__progressbar = mayPlayerWrapper.querySelector(".controls__progressbar");
var progress_input = controls__progressbar.querySelector("input");
var seek_tooltip = mayPlayerWrapper.querySelector(".seek-tooltip");
var progressColor = "rgba(255, 186, 0, 1)";


// media.addEventListener('loadedmetadata', () => {
//     video_time.textContent = gettime(media.duration)
// })

$(document).ready(function (){
    video_time.textContent = gettime(media.duration)
})

input.addEventListener("input", function () {
    media.currentTime = (this.value / 100) * media.duration;
});

seek_tooltip.style.display = "none";

let animatedBtn = document.createElement("div");
animatedBtn.classList.add("animated_btns");
media.insertAdjacentElement("afterend", animatedBtn);
animatedBtn.innerHTML = `<img src="./img/play.svg" alt="play">`;

function playanimation() {
    media.play();
    pause.style.display = "flex";
    play.style.display = "none";
    animatedBtn.classList.remove("animationsTow");
    animatedBtn.classList.toggle("animations");
    animatedBtn.innerHTML = "";
    animatedBtn.innerHTML = `<img src="./img/play.svg" alt="play">`;
}

function pauseanimation() {
    media.pause();
    pause.style.display = "none";
    play.style.display = "flex";
    animatedBtn.classList.toggle("animations");
    animatedBtn.classList.add("animationsTow");
    animatedBtn.innerHTML = "";
    animatedBtn.innerHTML = `<img src="./img/pause.svg" alt="pause">`;
}

animatedBtn.addEventListener("click", function () {
    if (!animatedBtn.classList.contains("animations")) {
        video_time.textContent = gettime(media.duration);
        playanimation();
        animatedBtn.style.display = "flex";
    } else {
        pauseanimation();
        animatedBtn.style.display = "flex";
    }
})

media.addEventListener("click", function () {
    video_time.textContent = gettime(media.duration);
    if (media.paused) {
        playanimation();
        animatedBtn.style.display = "flex";

    } else {
        pauseanimation();
        animatedBtn.style.display = "flex";
    }
});

play.addEventListener("click", function () {
    video_time.textContent = gettime(media.duration);
    if (media.paused) {
        playanimation();
        animatedBtn.style.display = "flex";
    } else {
        media.pause();
        play.style.display = "flex";
        pause.style.display = "none";
    }
});

pause.addEventListener("click", function () {
    video_time.textContent = gettime(media.duration);
    if (media.played) {
        pauseanimation();
        animatedBtn.style.display = "flex";
    } else {
        media.play();
        pause.style.display = "flex";
        play.style.display = "none";
    }
});

media.addEventListener("timeupdate", progressRange);

function progressRange() {
    current_time.textContent = gettime(media.currentTime);
    let barlength = (media.currentTime / media.duration) * 100;
    input.style.background = `linear-gradient(90deg, ${progressColor} ${barlength}%, #000000E6 0%)`;
}

rwd.addEventListener("click", function () {
    media.currentTime = media.currentTime - 10;
});

fwd.addEventListener("click", function () {
    media.currentTime = media.currentTime + 10;
});

input_volume.addEventListener("input", function () {
    mute_icon.style.display = "none";
    volume_icon.style.display = "flex";
    input_volume.setAttribute('value', `${this.value}`);
    media.volume = this.value / 100;
    input_volume.style.background = `linear-gradient(90deg,${progressColor} ${this.value}%, #FFFFFF33 0%)`;
});

volume_icon.addEventListener("click", function () {
    input_volume.classList.toggle("fadeInLeft");
    input_volume.style.display = "none";
    mute_icon.style.display = "flex";
    volume_icon.style.display = "none";
    input_volume.style.background = `linear-gradient(90deg, ${progressColor} 1% , rgba(255, 255, 255, 0.2) 0%)`;
    lastVal = input_volume.getAttribute("value");
    input_volume.setAttribute("value", "0");
    media.volume = 0;
});

mute_icon.addEventListener("click", function () {
    input_volume.style.display = "flex"
    volume_icon.style.display = "flex";
    mute_icon.style.display = "none";
    input_volume.style.background = `linear-gradient(90deg, ${progressColor}  ${lastVal}% , #FFFFFF33 0%)`;
    input_volume.setAttribute("value", `${lastVal}`);
    media.volume = lastVal / 100;
});

let video_theater = document.querySelector("#video-threater");
let default_palyer = document.querySelector("#default-palyer");
let theater = mayPlayerWrapper.querySelector(".theater");
let video_detailes = document.querySelector(".video-detailes");
let toggleThreat = false;

theater.addEventListener('click', function () {
    toggleThreat = !toggleThreat;
    if (toggleThreat) {
        video_theater.appendChild(default_palyer.firstElementChild);
        video_theater.style.marginTop = "15px"
        // default_palyer.innerHTML = '';
        return;
    }
    default_palyer.insertBefore(video_theater.lastElementChild,video_detailes)
    // default_palyer.appendChild(video_theater.lastElementChild);
    video_theater.style.marginTop = 0
    video_theater.innerHTML = '';
})

fullscreen_icon.addEventListener("click", function () {
    if (!document.fullscreenElement) {
        mayPlayerWrapper.requestFullscreen();
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

const pic = controls.querySelector(".pic");
if ('pictureInPictureEnabled' in document) {
    pic.addEventListener('click', function () {
        media.requestPictureInPicture().catch(error => console.log(error));
    })
} else {
    pic.style.display = "none";
}

document.querySelector("body").addEventListener("click", function () {
    if (speed.style.display === "flex") {
        speed.style.display = "none";
    }
});

const speed = controls.querySelector(".speed");
setting.addEventListener("click", function (e) {
    if (speed.style.display === "flex") {
        speed.style.display = "none";
    } else {
        speed.style.display = "flex";
        e.stopPropagation();
    }
});

$('.speed_rate_item').click(function (event) {
    $('.speed_rate_item').removeClass('active');
    $(this).addClass('active')
    media.playbackRate = +event.target.textContent.split('X')[0]
})

media.addEventListener("mouseenter", function () {
    speed.style.display = "none";
});

const gettime = function (time) {

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - (minutes * 60));
    if (minutes < 10) {
        minutes = "0" + minutes;
    } else {
        minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    } else {
        seconds;
    }
    return minutes + ":" + seconds;
}


function AdSlot(_name, _type, _time, _zone) {
    this.name = _name;
    this.type = _type;
    this.time = _time;
    this.zone = _zone;
    this.source = "";
    this.seen = false;
    this.playOnce = true;
}

function convertTimeFormat(hhmmss) {
    return hhmmss.substr(0, 2) * 3600 + hhmmss.substr(2, 2) * 60 + hhmmss.substr(4, 2) * 1;
}

function constructAdList(responseObj) {
    if (responseObj.getElementsByTagName("Linear")[0]) {
        const skipOffset = responseObj.getElementsByTagName("Linear")[0].getAttribute('skipoffset').split(':');
        skipAdsTime = (+skipOffset[0] * 3600) + (+skipOffset[1] * 60) + (+skipOffset[2]);
    }
    if (responseObj.getElementsByTagName("TrackingEvents")[0]) {
        const EventTracks = responseObj.getElementsByTagName("TrackingEvents")[0].children;
        Array.from(EventTracks).forEach(item => {
            switch (item.getAttribute('event')) {
                case 'start':
                    window.startURL = item.textContent.trim()
                    break
                case 'progress':
                    window.progressURL = item.textContent.trim()
                    break
                case 'firstQuartile':
                    window.firstQuartileURL = item.textContent.trim()
                    break
                case 'midpoint':
                    window.midpointURL = item.textContent.trim()
                    break
                case 'thirdQuartile':
                    window.thirdQuartileURL = item.textContent.trim()
                    break
                case 'complete':
                    window.completeURL = item.textContent.trim()
                    break
            }
        })
    }
    if (responseObj.getElementsByTagName("MediaFiles")[0]) {
        const MediaFiles = responseObj.getElementsByTagName("MediaFiles")[0].children;
        for (v in AdList) {
            const mp4Video = Array.from(MediaFiles).filter(item => item.getAttribute('type') === 'video/mp4');
            AdList[v].source = mp4Video[0].textContent.trim();
        }
    }
    if (responseObj.getElementsByTagName("VideoClicks")[0]) {
        const VideoClicks = responseObj.getElementsByTagName("VideoClicks")[0].children;
        const ClickThrough = Array.from(VideoClicks).filter(item => item.getElementsByTagName('ClickThrough'))
        if (ClickThrough && ClickThrough.length > 0) {
            adsClickLink = ClickThrough[0].textContent.trim();
        } else {
            adsClickLink = null;
        }
    } else {
        adsClickLink = null;
    }

    videoTag.addEventListener('timeupdate', showAdSlots, false);
}

AdsRequest = function (AdObj) {
    var i1 = 0;
    var i2 = 0;
    var i3 = 0;
    var i4 = 0;
    var zones = "";
    for (v in AdObj.schedule) {
        switch (AdObj.schedule[v].position) {
            case "pre-roll":
                var a = new AdSlot("pre-roll-" + i1, "pre-roll", 0, AdObj.schedule[v].zone);
                i1++;
                AdList.push(a);
                break
            case "mid-roll":
                var a = new AdSlot("mid-roll-" + i2, "mid-roll", convertTimeFormat(AdObj.schedule[v].startTime), AdObj.schedule[v].zone);
                i2++;
                AdList.push(a);
                break
            case "post-roll":
                var a = new AdSlot("post-roll-" + i3, "post-roll", 0, AdObj.schedule[v].zone);
                i3++;
                AdList.push(a);
                break
            case "auto:bottom":
                var a = new AdSlot("auto:bottom-" + i4, "auto:bottom", convertTimeFormat(AdObj.schedule[v].startTime), AdObj.schedule[v].zone);
                i4++;
                AdList.push(a);
                break
            default:
                break
        }
    }
    videoTag.addEventListener("canplay", setPostRollTime, false);
    videoTag.load();
};


parseAdsParameters = function (input) {
    return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(input.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + input + ')');
}

function enforcePrecision(n, nDecimalDigits) {
    return +(n).toFixed(nDecimalDigits);
}

function seekToOriginalPoint() {
    videoTag.removeEventListener('canplaythrough', seekToOriginalPoint, false);
    videoTag.removeEventListener('load', seekToOriginalPoint, false);
    videoTag.currentTime = enforcePrecision(tempTime, 1);
    videoTag.play();
    videoTag.addEventListener('timeupdate', showAdSlots, false);
}

function resumePlayBackAfterSlotShow() {
    videoTag.removeEventListener('ended', resumePlayBackAfterSlotShow, false);
    videoTag.removeEventListener('timeupdate', listenAdsPartTime, false);
    startFired = false;
    proggressFired = false;
    firstQuartileFired = false;
    midpointFired = false;
    thirdQuartileFired = false;
    completeFired = false;
    $(".skipBtn").hide();
    videoTag.src = videoTag.mainTrack;
    videoTag.play();

    if (videoTag.readyState !== 4) {
        videoTag.addEventListener('canplaythrough', seekToOriginalPoint, false);
        videoTag.addEventListener('load', seekToOriginalPoint, false);
        videoTag.pause();
    }
}

function callAdsTrackApi(url) {
    return new Promise((resolve, reject) => {
        let http_req = new XMLHttpRequest();
        http_req.open("GET", url, true);
        http_req.send(null);
        http_req.onreadystatechange = function () {
            if (http_req.readyState == 4 && http_req.status == 200) {
                http_req = null;
                resolve();
            }
        }
    })
}

listenAdsPartTime = function () {
    let URL;
    const videoAdsDuration = Math.floor(videoTag.duration);
    const start = 0;
    const progress = window.skipAdsTime;
    const firstQuartile = Math.ceil(videoAdsDuration / 4);
    const midpoint = firstQuartile * 2;
    const thirdQuartile = firstQuartile * 3;
    const complete = videoAdsDuration;

    switch (Math.floor(videoTag.currentTime)) {
        case start:
            URL = {url: window.startURL, event: 'start'}
            break
        case progress:
            URL = {url: window.progressURL, event: 'progress'}
            break
        case firstQuartile:
            URL = {url: window.firstQuartileURL, event: 'firstQuartile'}
            break
        case midpoint:
            URL = {url: window.midpointURL, event: 'midpoint'}
            break
        case thirdQuartile:
            URL = {url: window.thirdQuartileURL, event: 'thirdQuartile'}
            break
        case complete:
            URL = {url: window.completeURL, event: 'complete'}
            break
    }
    if ((URL && URL.event === 'start' && startFired === false)) {
        startFired = true;
        callAdsTrackApi(URL.url).then(() => {
        });
    }
    if ((URL && URL.event === 'progress' && proggressFired === false)) {
        proggressFired = true;
        callAdsTrackApi(URL.url).then(() => {
        });
    }
    if ((URL && URL.event === 'firstQuartile' && firstQuartileFired === false)) {
        firstQuartileFired = true;
        callAdsTrackApi(URL.url).then(() => {
        });
    }
    if ((URL && URL.event === 'midpoint' && midpointFired === false)) {
        midpointFired = true;
        callAdsTrackApi(URL.url).then(() => {
        });
    }
    if ((URL && URL.event === 'thirdQuartile' && thirdQuartileFired === false)) {
        thirdQuartileFired = true;
        callAdsTrackApi(URL.url).then(() => {
        });
    }
    if ((URL && URL.event === 'complete' && completeFired === false)) {
        completeFired = true;
        callAdsTrackApi(URL.url).then(() => {
        });
    }
}

function countdown() {

}

function playAdsInCorrectWay() {
    videoTag.removeEventListener('canplaythrough', playAdsInCorrectWay, false);
    videoTag.play();
    $(".skipBtn").show().addClass("disabled");
    $('.skipBtn').html(countDown);
    videoTag.onplaying = countDownInterval = setInterval(function () {
        $(".skipBtn").text(countDown - 1);
        if (countDown < 1) {
            $(".skipBtn").text('skip ads');
            clearInterval(countDownInterval);
        }
        countDown--;
    }, 1000);
}

function showSlot(slot) {
    videoTag.src = slot.source;
    videoTag.addEventListener('canplaythrough', playAdsInCorrectWay, false)
    videoTag.addEventListener('timeupdate', listenAdsPartTime, false);

    var intervalAd = setInterval(function () {
        if ($('#player').get(0).currentTime > skipAdsTime + 1) {
            $(".skipBtn").removeClass("disabled");
            clearInterval(intervalAd);
        }
    }, 1000);

    videoTag.addEventListener('ended', resumePlayBackAfterSlotShow, false);
}

function slotForCurrentTime(currentTime) {

    for (v in AdList) {
        if (!AdList[v].seen && AdList[v].source) {
            if (AdList[v].time == currentTime) {
                return AdList[v];
            }
        }
    }
    return null;
}

function showAdSlots() {
    var slot = slotForCurrentTime(Math.floor(videoTag.currentTime));
    if (slot) {
        slot.seen = true;
        tempTime = videoTag.currentTime;
        videoTag.removeEventListener('timeupdate', showAdSlots, false);
        showSlot(slot);
    }
}

var tempTime = 0;
var skipAdsTime = 5;
var countDownInterval;
var countDown = 5;

var startFired = false;
var proggressFired = false;
var firstQuartileFired = false;
var midpointFired = false;
var thirdQuartileFired = false;
var completeFired = false;

var adsClickLink;

var videoTag;
var AdList = new Array;
var supposedCurrentTime = 0;

var AdObj;

function initAdsFor(videoID) {

    window.videoTag = document.getElementById(videoID);
    videoTag.mainTrack = videoTag.src;

    if (videoTag.getAttribute('ads')) {
        AdObj = parseAdsParameters(videoTag.getAttribute('ads'));
        AdsRequest(AdObj);
        // getAdsSource();
    }
    videoTag.addEventListener('play', getAdsSource, false);
    videoTag.addEventListener('pause', managePauseVideo, false);
    videoTag.addEventListener('ended', manageEndedMainVideo, false);

    videoTag.addEventListener('timeupdate', function () {
        if (videoTag.mainTrack !== videoTag.src) {
            rwd.style.display = "none";
            fwd.style.display = "none";
            setting.style.display = "none";
            input.style.display = "none";

            let divADv = document.createElement("div");
            divADv.classList.add("controls__progressbar-current-ADV");
            controls__progressbar.append(divADv);

            current_time.textContent = gettime(media.currentTime);
            let barlength = (media.currentTime / media.duration) * 100;
            divADv.style.background = `linear-gradient(90deg, rgba(0, 206,209, 1) ${barlength}%, #000000E6 0%)`;
        }
        if (videoTag.mainTrack === videoTag.src) {
            rwd.style.display = "flex";
            fwd.style.display = "flex";
            if (floatingVideoActive) {
                setting.style.display = "none";
                rwd.style.display = "none";
                fwd.style.display = "none";
            } else {
                setting.style.display = "flex";
                rwd.style.display = "flex";
                fwd.style.display = "flex";
            }
            input.style.display = "flex";
            $('.controls__progressbar-current-ADV').css('display', 'none')
        }
    }, false);

    videoTag.addEventListener('seeking', function (e) {
        if (videoTag.mainTrack === videoTag.src && AdObj && AdObj.servers[0]["apiAddress"]) {
            if (AdList && AdList.length && AdList.every(item => !item.seen)) {
                videoTag.currentTime = 0;
            }
        }
    }, false);

    videoTag.addEventListener('seeked', function (e) {
        if (videoTag.mainTrack === videoTag.src) {
        }
    }, false);
}

getAdsSource = function () {
    videoTag.removeEventListener('play', getAdsSource, false);
    videoTag.removeEventListener('timeupdate', getAdsSource, false);
    if (AdObj && AdObj.servers[0]["apiAddress"]) {
        var http_request = new XMLHttpRequest();
        http_request.open("GET", AdObj.servers[0]["apiAddress"], true);
        http_request.send(null);
        http_request.onreadystatechange = function () {
            if (http_request.readyState == 4) {
                if (http_request.status == 200) {
                    var xml = http_request.responseXML;
                    if (xml) {
                        constructAdList(xml);
                    }else{
                        videoTag.src = videoTag.mainTrack;
                        AdList = [];
                        videoTag.play();
                    }
                }
                if (http_request.status == 403 || http_request.status == 404 || http_request.status == 401) {
                    videoTag.src = videoTag.mainTrack;
                    AdList = [];
                    videoTag.play();
                }
                http_request = null;
            }
        }
    }
    return;
}

managePauseVideo = function () {
    if (videoTag.mainTrack !== videoTag.src) {
        if (videoTag.currentTime !== videoTag.duration) {
            if (adsClickLink) {
                // window.open(adsClickLink, '_blank');
            }
        }
        clearInterval(countDownInterval);
        countDown = $('.skipBtn').text();
        if ($('.skipBtn').text() !== 'skip ads') {
            videoTag.addEventListener('timeupdate', resumeAdsVideo, false);
        }
    }
}

resumeAdsVideo = function () {
    videoTag.removeEventListener('timeupdate', resumeAdsVideo, false);
    if (countDown === 'skip ads') {
        return false;
    }
    $('.skipBtn').text(countDown);
    countDownInterval = setInterval(function () {
        $('.skipBtn').text(countDown - 1);
        if (countDown < 1) {
            $(".skipBtn").text('skip ads');
            clearInterval(countDownInterval);
        }
        countDown--;
    }, 1000)
}

manageSeekingVideo = function (event) {
    if (videoTag.mainTrack !== videoTag.src) {
        event.preventDefault();
        videoTag.removeEventListener('seeking', manageSeekingVideo, false);
        const time = videoTag.currentTime;
        videoTag.currentTime = time;
    }
}

manageEndedMainVideo = function () {
    supposedCurrentTime = 0;
    if (videoTag.mainTrack === videoTag.src) {
        AdList.forEach(item => item.seen = false);
        countDown = 5;
        play.style.display = "flex";
        pause.style.display = "none";
        videoTag.addEventListener('timeupdate', getAdsSource, false);
        animatedBtn.classList.toggle("animations");
    }
}

function setPostRollTime() {
    videoTag.removeEventListener("canplay", setPostRollTime, false);
    for (v in AdList) {
        if (AdList[v].type == "post-roll") {
            AdList[v].time = Math.floor(videoTag.duration);
        }
    }
}

$(document).on('click', '.skipBtn', function (e) {
    if ($('#player').get(0).currentTime < skipAdsTime) {
        return;
    }
    resumePlayBackAfterSlotShow()
});

var floatingVideoActive = false;
var pipActive = false;
var $window = $(window);
var $videoWrap = $('.videoContainer');
var $video = $('.video');
var videoHeight = $video.outerHeight(true);
var windowScrollTop;
var videoBottom;


$window.on('scroll', function () {
    if (!toggleThreat) {
        windowScrollTop = $window.scrollTop();
        videoBottom = videoHeight + $videoWrap.offset().top;
        if (pipActive) return false;
        if (windowScrollTop > videoBottom + 150) {
            $videoWrap.height(videoHeight);
            $video.addClass('stuck');
            // if (videoTag.mainTrack !== videoTag.src) {
            //     rwd.style.display = "none";
            //     fwd.style.display = "none";
            // }else {
            //
            // }
            rwd.style.display = "none";
            fwd.style.display = "none";
            video_time.style.display = 'none';
            current_time.style.display = 'none';
            time_divider.style.display = 'none';
            theater.style.display = 'none';
            setting.style.display = "none";
            speed.style.display = "none"
            animatedBtn.style.width = '40px';
            animatedBtn.style.height = '40px';
            floatingVideoActive = true;

        } else {
            $videoWrap.height('auto');
            $video.removeClass('stuck');
            if (videoTag.mainTrack !== videoTag.src) {
                rwd.style.display = 'none';
                fwd.style.display = 'none';
            } else {
                rwd.style.display = 'flex';
                fwd.style.display = 'flex';
            }
            video_time.style.display = 'inline-flex';
            current_time.style.display = 'inline-flex';
            time_divider.style.display = 'inline-flex';
            theater.style.display = 'flex';
            setting.style.display = "flex";
            animatedBtn.style.width = '80px';
            animatedBtn.style.height = '80px';
            floatingVideoActive = false;
        }
    }
});

media.addEventListener('enterpictureinpicture', function () {
    pipActive = true;
    if ($video.hasClass('stuck')) {
        $videoWrap.height('auto');
        $video.removeClass('stuck');
    }
});

media.addEventListener('leavepictureinpicture', function () {
    pipActive = false;
    if (windowScrollTop > videoBottom) {
        $videoWrap.height(videoHeight);
        $video.addClass('stuck');
    } else {
        $videoWrap.height('auto');
        $video.removeClass('stuck');
    }
});




