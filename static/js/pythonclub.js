var posts = [];
var postList = document.getElementById('post-list');

function showPosts(){
    /*
        Percorre o array `posts` e mostra dentro do elemento `postList`
        o link para cada `post` parseado.
    */
    postList.innerHTML = '';

    for (var i=0; i<posts.length; i++){
        var postJSON = posts[i];
        var postTemplate = "<a class='post-link' href='" + postJSON.url + "' target='_blank'>" + postJSON.title + "</a>";

        postList.innerHTML = postList.innerHTML + postTemplate;
    }
    postList.style.visibility = "visible";
}

function getPosts(){
    /*
        Faz uma requisição para o PythonClub e mostra todos
        os posts ou uma mensagem de erro.
    */
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            savePosts(xhttp.responseText);
            Pace.on('done', showPosts);
        } else {
            Pace.on('done', showFailedBox);
        }
    }

    xhttp.open('GET', 'http://pythonclubx.com.br/', true);
    xhttp.send();
}

function savePosts(pageHtml){
    /*
        Realiza o parser de todos os posts do PythonClub e insere
        no array `posts`
    */
    var postsRegex = /{"url": "[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)", "title": "((?:\\.|[^\"\\])*)"}/g;
    var post;

    while ((post = postsRegex.exec(pageHtml)) !== null) {
        if (post.index === postsRegex.lastIndex) {
            postsRegex.lastIndex++;
        }

        var postJSON = JSON.parse(post[0]);
        posts.push(postJSON);
    }

}

function showFailedBox(){
    /* Mostra a mensagem de erro com um link para reload */
    var failedBox = document.getElementById('failed-box');

    failedBox.style.visibility = "visible";
    failedBox.style.display = "block";

    var link = failedBox.querySelector('a');
    link.onclick = function(){
        window.location.reload();
    }
}

window.onload = getPosts;

