// Array holding the blog post data
const posts = [
    {
        title: "Post 1: An Image of Success",
        date: "October 13, 2026",
        content: `(Image of a man with prosthetic leg running towards the camera.)
        \nI chose this image because technology should be used to help people, such as improving people's health
        and helping people with disabilities.`,
        image: "image.png",
        alt: "Image of a man with prosthetic leg running towards the camera"
    }
];

// Select the container where posts will go
const container = document.getElementById('blog-container');

// Loop through each post and create the necessary HTML elements
posts.forEach(post => {
    // Create the article container
    const article = document.createElement('article');
    article.className = 'post';

    // Create and set the title
    const title = document.createElement('h2');
    title.textContent = post.title;

    // Create and set the date
    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = post.date;

    // Create and set the image
    const image = document.createElement('img');
    image.src = post.image;
    image.alt = post.alt;
    image.className = 'post-image';

    // Create and set the content
    const content = document.createElement('p');
    content.textContent = post.content;

    // Append all elements to the article
    article.appendChild(title);
    article.appendChild(date);
    article.appendChild(image);
    article.appendChild(content);

    // Append the article to the main container on the page
    container.appendChild(article);
});