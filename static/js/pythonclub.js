var posts = [];
var postList = document.getElementById('post-list');

function showPosts(){
    postList.innerHTML = '';

    for (var i=0; i<posts.length; i++){
        var postJSON = posts[i];
        var postTemplate = "<a class='post-link' href='" + postJSON.url + "' target='_blank'>" + postJSON.title + "</a>";

        postList.innerHTML = postList.innerHTML + postTemplate;
    }
}

function getPosts(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            savePosts(xhttp.responseText);
            Pace.on('done', showPosts);
        } else {
            // TODO: Failed message
        }
    }

    xhttp.open('GET', 'http://pythonclub.com.br/', true);
    xhttp.send();
}

function savePosts(pageHtml){
    var postsRegex = new RegExp(/{"url": "[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)", "title": "((?:\\.|[^"\\])*)"}/g);
    var post;

    while ((post = postsRegex.exec(pageHtml)) !== null) {
        if (post.index === postsRegex.lastIndex) {
            postsRegex.lastIndex++;
        }

        var postJSON = JSON.parse(post[0]);
        posts.push(postJSON);
    }

}

window.onload = getPosts;

