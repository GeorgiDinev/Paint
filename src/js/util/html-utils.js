function HtmlUtils(){}
HtmlUtils.openImgInBrowser = function(downloadName, htmlContent, href, parent, attributes){

    var anchor = document.createElement('a');

    anchor.addEventListener('click', function(ev) {
        anchor.href = href;
        anchor.download = downloadName;
    });

    parent.appendChild(anchor);
};
