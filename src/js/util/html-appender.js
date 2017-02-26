function HtmlAppender(){}
HtmlAppender.appendAnchorToHtml = function(downloadName, htmlContent, href,  parent, attributes){

    var anchor = document.createElement('a');
    anchor.innerHTML = htmlContent;

    anchor.addEventListener('click', function(ev) {
        anchor.href = href;
        anchor.download = downloadName;
    });

    parent.appendChild(anchor);
};
