function showPost(post){

    var postJSON = JSON.parse(post[0]);

    var postTemplate = "<a class='post-link' href='" + postJSON.url + "' target='_blank'>" + postJSON.title + "</a>";

    var postList = document.getElementById('post-list');

    postList.innerHTML = postList.innerHTML + postTemplate;

}

function showPosts(pageHtml){
    var postsRegex = new RegExp(/{"url": "[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)", "title": "((?:\\.|[^"\\])*)"}/g);

    var post;

    while ((post = postsRegex.exec(pageHtml)) !== null) {
        if (post.index === postsRegex.lastIndex) {
            postsRegex.lastIndex++;
        }
        showPost(post);
    }

}

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
