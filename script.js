// Array holding the blog post data
const posts = [
    {
        title: "Post 2: Teamwork",
        date: "November 3, 2026",
        content: `Teamwork went well for the lightning presentations. We decided to split up the work such that each person did one slide and it went well. We determined beforehand our topic and what date we should get it done by. I see myself in team writing tasks working well with my teammates and communicating to ensure everything goes smoothly.`
    },
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

    // Create an image only when the post includes one
    let image;
    if (post.image) {
        image = document.createElement('img');
        image.src = post.image;
        image.alt = post.alt || '';
        image.className = 'post-image';
    }

    // Create and set the content
    const content = document.createElement('p');
    content.textContent = post.content;

    // Append all elements to the article
    article.appendChild(title);
    article.appendChild(date);
    if (image) {
        article.appendChild(image);
    }
    article.appendChild(content);

    // Append the article to the main container on the page
    container.appendChild(article);
});

const canvas = document.getElementById('math-background');
const context = canvas.getContext('2d');
let viewportWidth = 0;
let viewportHeight = 0;
let backgroundStars = [];

function createBackgroundStars() {
    const starCount = Math.min(192, Math.max(64, Math.round(viewportWidth * viewportHeight / 12000)));
    backgroundStars = Array.from({ length: starCount }, () => ({
        x: Math.random() * viewportWidth,
        y: Math.random() * viewportHeight,
        size: 1.5 + Math.random() * 6.5,
        opacity: 0.35 + Math.random() * 0.4,
        rotation: Math.random() * Math.PI,
        scrollFactor: 0.18 + Math.random() * 0.55
    }));
}

function isPointInsideRay(x, y, scrollPhase) {
    const sunRadius = Math.min(viewportWidth, viewportHeight) * 0.42;
    const sunX = -sunRadius * 0.3;
    const sunY = -sunRadius * 0.3;
    const rayStartRadius = sunRadius * 1.24;
    const rayLength = Math.hypot(viewportWidth, viewportHeight) * 1.4;
    const rayDrift = Math.sin(scrollPhase * 0.2) * 0.09;
    const distance = Math.hypot(x - sunX, y - sunY);

    if (distance < rayStartRadius || distance > rayLength) return false;

    const pointAngle = Math.atan2(y - sunY, x - sunX);
    const distanceProgress = (distance - rayStartRadius) / (rayLength - rayStartRadius);

    for (let ray = 0; ray < 17; ray += 1) {
        const rayAngle = -0.42 + (ray / 16) * 1.92 + rayDrift;
        const halfWidth = 0.024 * (1 - distanceProgress * 0.82);
        const angleDifference = Math.atan2(Math.sin(pointAngle - rayAngle), Math.cos(pointAngle - rayAngle));

        if (Math.abs(angleDifference) <= halfWidth) return true;
    }

    return false;
}

function drawBackgroundStars(isDarkMode, scrollPhase) {
    const scrollY = window.scrollY;
    const themeColor = isDarkMode ? '#ffffff' : '#000000';
    const rayStarColor = isDarkMode ? '#a6a6a6' : '#808080';

    backgroundStars.forEach(star => {
        const x = ((star.x + scrollY * star.scrollFactor * 0.12) % viewportWidth + viewportWidth) % viewportWidth;
        const y = ((star.y - scrollY * star.scrollFactor) % viewportHeight + viewportHeight) % viewportHeight;
        const color = isPointInsideRay(x, y, scrollPhase) ? rayStarColor : themeColor;

        context.save();
        context.translate(x, y);
        context.rotate(star.rotation + scrollY * star.scrollFactor * 0.001);
        context.globalAlpha = star.opacity;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(0, -star.size);
        context.quadraticCurveTo(star.size * 0.16, -star.size * 0.16, star.size, 0);
        context.quadraticCurveTo(star.size * 0.16, star.size * 0.16, 0, star.size);
        context.quadraticCurveTo(-star.size * 0.16, star.size * 0.16, -star.size, 0);
        context.quadraticCurveTo(-star.size * 0.16, -star.size * 0.16, 0, -star.size);
        context.fill();
        context.restore();
    });
}

function clearSunHalo(isDarkMode) {
    const sunRadius = Math.min(viewportWidth, viewportHeight) * 0.42;
    const sunX = -sunRadius * 0.3;
    const sunY = -sunRadius * 0.3;
    const clearRadius = sunRadius * 1.24;

    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(sunX, sunY, clearRadius, 0, Math.PI * 2);
    context.fill();
    context.restore();

    context.beginPath();
    context.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    context.fillStyle = isDarkMode ? '#ffffff' : '#000000';
    context.fill();
}

function drawSunAndRays(isDarkMode, scrollPhase) {
    const sunRadius = Math.min(viewportWidth, viewportHeight) * 0.42;
    const sunX = -sunRadius * 0.3;
    const sunY = -sunRadius * 0.3;
    const rayStartRadius = sunRadius * 1.24;
    const rayLength = Math.hypot(viewportWidth, viewportHeight) * 1.4;
    const rayColor = isDarkMode ? '255, 255, 255' : '0, 0, 0';
    const rayOpacity = isDarkMode ? 0.17 : 0.1;
    const rayDrift = Math.sin(scrollPhase * 0.2) * 0.09;

    for (let ray = 0; ray < 17; ray += 1) {
        const progress = ray / 16;
        const angle = -0.42 + progress * 1.92 + rayDrift;
        const halfWidth = 0.024;
        const startX = sunX + Math.cos(angle) * rayStartRadius;
        const startY = sunY + Math.sin(angle) * rayStartRadius;
        const endX = sunX + Math.cos(angle) * rayLength;
        const endY = sunY + Math.sin(angle) * rayLength;
        const gradient = context.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, `rgba(${rayColor}, ${rayOpacity})`);
        gradient.addColorStop(0.35, `rgba(${rayColor}, ${rayOpacity * 0.55})`);
        gradient.addColorStop(1, `rgba(${rayColor}, 0)`);

        context.beginPath();
        context.moveTo(sunX + Math.cos(angle - halfWidth) * rayStartRadius, sunY + Math.sin(angle - halfWidth) * rayStartRadius);
        context.lineTo(sunX + Math.cos(angle - halfWidth * 0.18) * rayLength, sunY + Math.sin(angle - halfWidth * 0.18) * rayLength);
        context.lineTo(sunX + Math.cos(angle + halfWidth * 0.18) * rayLength, sunY + Math.sin(angle + halfWidth * 0.18) * rayLength);
        context.lineTo(sunX + Math.cos(angle + halfWidth) * rayStartRadius, sunY + Math.sin(angle + halfWidth) * rayStartRadius);
        context.closePath();
        context.fillStyle = gradient;
        context.fill();
    }

    context.beginPath();
    context.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    context.fillStyle = isDarkMode ? '#ffffff' : '#000000';
    context.fill();
}

function renderBackground() {
    context.clearRect(0, 0, viewportWidth, viewportHeight);
    const scrollPhase = window.scrollY * 0.0045;
    const amplitude = Math.min(viewportHeight * 0.16, 92);
    const steps = Math.max(240, Math.ceil(viewportWidth / 2));
    const isDarkMode = document.body.dataset.theme === 'dark';
    drawSunAndRays(isDarkMode, scrollPhase);

    for (let line = 0; line < 7; line += 1) {
        const baseline = viewportHeight * (0.12 + line * 0.13);
        const cycles = 1.45 + line * 0.035;
        const opacity = line === 3 ? (isDarkMode ? 0.92 : 0.24) : (isDarkMode ? 0.76 : 0.15);
        const color = isDarkMode ? '255, 255, 255' : '92, 96, 100';
        const points = [];

        for (let step = 0; step <= steps; step += 1) {
            const progress = step / steps;
            const angle = progress * Math.PI * 2 * cycles + scrollPhase + line * 0.7;
            const envelope = 0.65 + 0.35 * Math.sin(progress * Math.PI * 0.84 + line * 0.57 - scrollPhase * 0.18);
            const y = baseline
                + Math.sin(angle) * amplitude * envelope
                + Math.sin(angle * 0.48 - scrollPhase * 0.5 + line) * amplitude * 0.25;
            const x = progress * viewportWidth;
            points.push({ x, y, insideRay: isPointInsideRay(x, y, scrollPhase) });
        }

        context.beginPath();
        context.strokeStyle = `rgba(${color}, ${opacity})`;
        context.lineWidth = line === 3 ? 2.4 : 1.6;
        points.forEach((point, index) => {
            if (index === 0) context.moveTo(point.x, point.y);
            else context.lineTo(point.x, point.y);
        });
        context.stroke();

        context.beginPath();
        context.strokeStyle = isDarkMode ? '#ffffff' : '#000000';
        context.lineWidth = line === 3 ? 4 : 3.2;
        let isDrawingRaySegment = false;
        points.forEach(point => {
            if (point.insideRay) {
                if (!isDrawingRaySegment) context.moveTo(point.x, point.y);
                else context.lineTo(point.x, point.y);
                isDrawingRaySegment = true;
            } else {
                isDrawingRaySegment = false;
            }
        });
        context.stroke();
    }

    drawBackgroundStars(isDarkMode, scrollPhase);
    clearSunHalo(isDarkMode);
}

function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    canvas.width = Math.round(viewportWidth * pixelRatio);
    canvas.height = Math.round(viewportHeight * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    createBackgroundStars();
    renderBackground();
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', renderBackground, { passive: true });

resizeCanvas();

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    const isDarkMode = themeToggle.getAttribute('aria-checked') === 'true';
    const nextIsDarkMode = !isDarkMode;
    themeToggle.setAttribute('aria-checked', String(nextIsDarkMode));
    document.body.dataset.theme = nextIsDarkMode ? 'dark' : 'light';
    renderBackground();
});
