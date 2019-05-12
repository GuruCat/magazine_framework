/**
 * Purpose: blink a page element
 * Preconditions: the element you want to apply the blink to, the number of times to blink the element (or -1 for infinite times), the speed of the blink
 **/
function blink(elem, times, speed) {
    if (times > 0 || times < 0) {
        if (elem.hasClass("blink")) elem.removeClass("blink");
        else elem.addClass("blink");
    }

    clearTimeout(function () {
        blink(elem, times, speed);
    });

    if (times > 0 || times < 0) {
        setTimeout(function () {
            blink(elem, times, speed);
        }, speed);
        times -= .5;
    }
}
function scrollToTop() {
    $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
      return false;
}
function scrollToC(idToc) {
    var elem = $("#" + idToc);
    if (elem) {
        blink(elem, 4, 200);
        var offset = elem.offset();
        $('html, body').animate({scrollTop : offset.top - 150}, 200);
    }
}

function createLinkOnClick(href, onclick, textContent) {
	var a = document.createElement("a");
    a.setAttribute("href", href);
    a.setAttribute("onclick", onclick);
    a.textContent = textContent;
    a.innerHTML = a.innerHTML + "<br>";
	return a;
}
//Generate Table of Contents
function generateToC() {
    var tocLayer = document.getElementById("tocLayer");
    var postingLayer = document.getElementById("postingLayer");
    var i2 = 0, i3 = 0, i4 = 0;
    if (tocLayer != null && postingLayer != null) {
        $(".article h2, .article h3, .article h4").each(function() {
            el = $(this);
            var node = el.get(0);
            var tagName = el.prop("tagName");
            tagName = tagName.toLowerCase();
            if (tagName == "h4") {
                if(i3!=0) {
                    ++i4;
                    var section = i2 + "_" + i3 + "_" + i4;
                    var link = createLinkOnClick("javascript:void(0);", "scrollToC(\"section" + section + "\");", section.replace(/_/g, ".")+". "+node.textContent);
                    link.className = "toc_lv3";
                    tocLayer.appendChild(link);
                    node.id = "section" + section;
                }
            }
            else if (tagName == "h3") {
                ++i3, i4 = 0;
                var section = i2 + "_" + i3;
                node.id = "section" + section;
                var link = createLinkOnClick("javascript:void(0);", "scrollToC(\"section" + section + "\");", section.replace(/_/g, ".") +". "+node.textContent);
                link.className = "toc_lv2";
                tocLayer.appendChild(link);
            }
            else if (tagName == "h2") {
                ++i2, i3 = 0, i4 = 0;
                var section = i2;
                var link = createLinkOnClick("javascript:void(0);", "scrollToC(\"section" + section + "\");", section+". "+node.textContent);
                link.className="toc_lv1";
                node.id = "section" + section;
                tocLayer.appendChild(link);
            }
        });

        if (i2 != 0 || i3 != 0 || i4 != 0) {
            var elm = document.createElement("h2");
            elm.innerHTML = "<i class='fa fa-list-ol' aria-hidden='true'></i> Contents:";
            tocLayer.insertBefore(elm, tocLayer.firstChild);
        } else {
            var elm = document.createElement("h2");
            elm.innerHTML = "No Contents list here.";
            tocLayer.insertBefore(elm, tocLayer.firstChild);
        }
    }
}
function contentsAdLocate() {
    /* 본문 광고 삽입 */
    var midAd = document.getElementsByClassName("mid-ad");
    var midAdContents = document.getElementById("adpos-contents-mid");
    if(midAdContents) {
        if (midAd){
            for(i=0;i<midAd.length;i++){
                midAd[i].innerHTML = midAdContents.innerHTML;
                midAd[i].setAttribute("style", "width:100%;text-align:center;");
            }
        }
        midAdContents.remove();
    }
}
var mode = 1;
// function adLocate() {
//     /* [Advertisement] 해상도 변화에 따라 좌측 세로형 광고를 보여주거나 사라지게 함 */
//     if (window.getWindowCleintWidth() >= 1550) {
//         old_mode = mode; mode = 1;
//         if (old_mode != mode) {
//             $("#adpos-vertical").append($("#movead-vertical-1550"));
//         }
//     } else {
//         old_mode = mode; mode = 0;
//         if (old_mode != mode) {
//             $("#adpos-hidden").append($("#movead-vertical-1550"));
//         }				
//     }
// }
/* Login Button Mapping */
function mappingLoginBtn() {
//    var tmpLogin = document.getElementsByClassName("tt_menubar_logout")[0].getElementsByTagName("a")[0];
    var tmpLogin = document.getElementsByClassName("tt_menubar_logout")[0].getElementsByTagName("a")[0];
    tmpLogin.className = "";
    tmpLogin.innerHTML = tmpLogin.innerHTML.replace("로그아웃",'<i class="fa fa-unlock fa-fw"></i> Logout');
    tmpLogin.innerHTML = tmpLogin.innerHTML.replace("로그인",'<i class="fa fa-lock fa-fw"></i> Login');
    document.getElementById("loginout_append").innerHTML = tmpLogin.outerHTML; 
}
function onReadyFn (jQuery) {
    /* code to run when the document is ready */
    /* It will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute. */
    generateToC();
    // adLocate();
    contentsAdLocate();
    //mappingLoginBtn();
    
    /* [광고] Google AdSense Script 비동기 로드 */
    var adNum = document.getElementsByClassName("adsbygoogle");
    if (adNum && adNum.length > 0) {
        for (var i=0;i<adNum.length;++i)
            (adsbygoogle = window.adsbygoogle || []).push({});
    }
    /* adLocate() function would be called when window-resize event */
    //window.onresize = function() { adLocate() };
}