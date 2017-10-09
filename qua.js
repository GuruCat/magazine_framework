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

//Generate Table of Contents through Advacned way
function generateAdvToC(toc) {
    if(toc){
        var i2 = 0, i3 = 0, i4 = 0;
        toc = toc.appendChild(document.createElement("ul"));
        for (var i = 0; i < document.body.childNodes.length; ++i) {
            var node = document.body.childNodes[i];
            var tagName = node.nodeName.toLowerCase();
            if (tagName == "h4") {
                ++i4;
                if (i4 == 1) toc.lastChild.lastChild.lastChild.appendChild(document.createElement("ul"));
                var section = i2 + "." + i3 + "." + i4;
                node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
                node.id = "section" + section;
                toc.lastChild.lastChild.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
            }
            else if (tagName == "h3") {
                ++i3, i4 = 0;
                if (i3 == 1) toc.lastChild.appendChild(document.createElement("ul"));
                var section = i2 + "." + i3;
                node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
                node.id = "section" + section;
                toc.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
            }
            else if (tagName == "h2") {
                ++i2, i3 = 0, i4 = 0;
                var section = i2;
                node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
                node.id = "section" + section;
                toc.appendChild(h2item = document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
            }
        }
    }
}
function generateToC() {
    var ToC = "<div class='table-of-contents'><h2><i class='fa fa-list-ol' aria-hidden='true'></i> Contents:</h2>";
    var newLine, el, title, link;
    var toc_idx=1;
    var genId;

    $(".article h2").each(function() {
        // loop
        el = $(this);
 
        title = toc_idx + ". " + el.text();
        
        // generate span tag and give ID for 'H2' header
        genId = "toc_id_" + toc_idx;
        link = "#" + genId;
        el.attr("id", genId);
        toc_idx++;
        // newLine = "<a href='"+link+"'>" + title + "</a><br/>";
        newLine = "<a href='javascript:void(0);' onclick='scrollToC(\"" + genId + "\");'>" + title + "</a><br/>";
        ToC+=newLine;

    });
    ToC+="</div>";
    $("#tocLayer").append(ToC);
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
    mappingLoginBtn();
    
    /* [광고] Google AdSense Script 비동기 로드 */
    var adNum = document.getElementsByClassName("adsbygoogle");
    if (adNum && adNum.length > 0) {
        for (var i=0;i<adNum.length;++i)
            (adsbygoogle = window.adsbygoogle || []).push({});
    }
    /* adLocate() function would be called when window-resize event */
    //window.onresize = function() { adLocate() };
}