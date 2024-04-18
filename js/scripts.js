/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})


// Custom RSS Feed from NBA news in the NBA section of ESPN

const RSS_URL = 'https://www.espn.com/espn/rss/nba/news';
// By default, this feed only pulls in 10 unless adding the api and count parameters -> see https://rss2json.com/docs
const RSSConverter = `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}`

// Get the feed data from the rss link
const getNBAFeedData = async () => {
    const response = await fetch(RSSConverter);
    const data = await response.json();
    console.log(data);
    createHTMLFromFeedData(data);
};

// Create HTML for each piece of data after grabbing feed info
const createHTMLFromFeedData = (data) => {
    const feedContainer = document.getElementById('rss-feed');

    // Get individual pieces of RSS feed for HTML elements
    const titles = getFeedTitles(data);
    const descriptions = getFeedDescriptions(data);
    const authors = getFeedAuthors(data);
    const links = getFeedLinks(data);
    const pubDates = getFeedPubDate(data);
    const srcs = getFeedImageSrcs(data);

    // Iterate over each attribute array and create HTML elements
    for (let i = 0; i < titles.length; i++) {
        const divWrapper = document.createElement('div');
        divWrapper.classList.add('rss-div');

        const leftDiv = document.createElement('div');
        leftDiv.classList.add('rss-div-left');
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('rss-div-right');

        const link = document.createElement('a');
        link.href = links[i];
        link.target = "_blank"
        link.classList.add('rss-link')
        divWrapper.appendChild(link);

        const title = document.createElement('h2');
        title.textContent = titles[i];
        title.classList.add('rss-title')
        rightDiv.appendChild(title);

        const description = document.createElement('p');
        description.textContent = descriptions[i];
        description.classList.add('rss-description')
        rightDiv.appendChild(description);

        const author = document.createElement('p');
        author.textContent = authors[i];
        author.classList.add('rss-author')
        rightDiv.appendChild(author);

        const pubDate = document.createElement('p');
        pubDate.textContent = pubDates[i];
        pubDate.classList.add('rss-pubDate')
        rightDiv.appendChild(pubDate);

        const image = document.createElement('img');
        image.src = srcs[i];
        image.alt = `image thumbnail for ${titles[i]}`
        image.classList.add('rss-image')
        leftDiv.appendChild(image);

        link.appendChild(leftDiv);
        link.appendChild(rightDiv);
        feedContainer.appendChild(divWrapper);
    }
};

// Get specific feed info from data that's passed in
const getFeedTitles = (posts) => {
    let titles = [];
    for (let post of posts.items) {
        titles.push(post.title);
    }
    return titles;
};
const getFeedDescriptions = (posts) => {
    let descriptions = [];
    for (let post of posts.items) {
        descriptions.push(post.description);
    }
    return descriptions;
};
const getFeedAuthors = (posts) => {
    let authors = [];
    for (let post of posts.items) {
        authors.push(post.dc);
    }
    return authors;
};
const getFeedLinks = (posts) => {
    let links = [];
    for (let post of posts.items) {
        links.push(post.link);
    }
    return links;
};
const getFeedPubDate = (posts) => {
    let pubDates = [];
    for (let post of posts.items) {
        pubDates.push(post.pubDate);
    }
    return pubDates;
};
const getFeedImageSrcs = (posts) => {
    let srcs = [];
    for (let post of posts.items) {
        obj = post.enclosure;
        srcs.push(obj.link)
    }
    return srcs;
};
