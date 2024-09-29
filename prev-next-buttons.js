function loadPrevNext() {
    var currentUrl = window.location.href;
    var label = document.querySelector('meta[itemprop="articleSection"]').content;
    
    var prevLink = '';
    var nextLink = '';

    fetch('/feeds/posts/summary/-/'+label+'?alt=json&max-results=500')
    .then(response => response.json())
    .then(data => {
        var posts = data.feed.entry;
        var currentIndex = -1;

        for (var i = 0; i < posts.length; i++) {
            if (posts[i].link[4].href === currentUrl) {
                currentIndex = i;
                break;
            }
        }

        if (currentIndex > 0) {
            prevLink = posts[currentIndex - 1].link[4].href;
        }

        if (currentIndex < posts.length - 1) {
            nextLink = posts[currentIndex + 1].link[4].href;
        }

        if (prevLink) {
            document.querySelector('#prev-post').href = prevLink;
            document.querySelector('#prev-post').style.display = 'inline-block';
        }
        if (nextLink) {
            document.querySelector('#next-post').href = nextLink;
            document.querySelector('#next-post').style.display = 'inline-block';
        }
    });
}

window.onload = function() {
    if (document.querySelector('meta[itemprop="articleSection"]')) {
        loadPrevNext();
    }
};
