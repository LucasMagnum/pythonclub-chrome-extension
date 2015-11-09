function showPosts(postsHtml){}

function showFailed(){}


function getPosts(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            showPosts(xhttp.responseText);
        } else {
            showFailed();
        }
    }

    xhttp.open('GET', 'http://pythonclub.com.br/', true);
    xhttp.send();
}

window.onload = getPosts;
