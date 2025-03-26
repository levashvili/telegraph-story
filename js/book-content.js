// Book content loader and renderer
class BookContent {
    constructor() {
        this.content = null;
        this.bookElement = document.getElementById('book');
    }

    async loadContent() {
        try {
            // Add timestamp to prevent caching
            const response = await fetch(`../content/book.json?t=${new Date().getTime()}`);
            this.content = await response.json();
            console.log('Loaded content:', this.content); // Debug log
            this.renderContent();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error loading book content:', error);
        }
    }

    setupEventListeners() {
        // Add click handler for cover page
        const coverPage = document.querySelector('.cover');
        if (coverPage) {
            coverPage.addEventListener('click', () => {
                // Turn to the first content page (page 3, after cover and TOC)
                $('#book').turn('page', 3);
            });
        }

        // Add click handlers for navigation buttons
        $('#prev-page').click(() => {
            $('#book').turn('previous');
        });

        $('#next-page').click(() => {
            $('#book').turn('next');
        });

        // Add keyboard navigation
        $(document).keydown((e) => {
            switch(e.keyCode) {
                case 37: // Left arrow
                    $('#book').turn('previous');
                    break;
                case 39: // Right arrow
                    $('#book').turn('next');
                    break;
            }
        });
    }

    renderContent() {
        if (!this.content) return;

        // Update metadata
        document.title = this.content.metadata.title;
        const headerTitle = document.querySelector('header h1');
        const headerAuthor = document.querySelector('header p');
        
        console.log('Updating header:', {
            title: this.content.metadata.title,
            author: this.content.metadata.author
        }); // Debug log
        
        headerTitle.textContent = this.content.metadata.title;
        headerAuthor.textContent = `By ${this.content.metadata.author}`;
        document.querySelector('footer p').textContent = this.content.metadata.copyright;

        // Clear existing content
        this.bookElement.innerHTML = '';

        // Render each page
        this.content.pages.forEach(page => {
            const pageElement = this.createPageElement(page);
            this.bookElement.appendChild(pageElement);
        });

        // Initialize Turn.js after content is loaded
        this.initializeTurnJS();
    }

    createPageElement(page) {
        const section = document.createElement('section');
        section.className = `page ${page.type}`;
        section.id = page.id;

        const article = document.createElement('article');

        switch (page.type) {
            case 'cover':
                article.innerHTML = this.createCoverPage(page);
                break;
            case 'toc':
                article.innerHTML = this.createTableOfContents(page);
                break;
            case 'content':
                article.innerHTML = this.createContentPage(page);
                break;
        }

        section.appendChild(article);
        return section;
    }

    createCoverPage(page) {
        return `
            <div class="cover-content">
                <h2>${page.title}</h2>
                <p class="author">${page.author}</p>
                <div class="cover-image">
                    <img src="${page.image}" alt="${page.imageAlt}">
                </div>
                <p class="start-reading">${page.startReadingText}</p>
            </div>
        `;
    }

    createTableOfContents(page) {
        const chaptersList = page.chapters
            .map(chapter => `
                <li><a href="#${chapter.id}">${chapter.title}</a></li>
            `)
            .join('');

        return `
            <h2>${page.title}</h2>
            <nav class="toc-nav">
                <ul>${chaptersList}</ul>
            </nav>
        `;
    }

    createContentPage(page) {
        return `
            <div class="page-number">${page.pageNumber}</div>
            <h2>${page.title}</h2>
            <p>${page.content}</p>
            ${page.image ? `
                <figure>
                    <img src="${page.image.src}" alt="${page.image.alt}">
                    <figcaption>${page.image.caption}</figcaption>
                </figure>
            ` : ''}
        `;
    }

    initializeTurnJS() {
        $('#book').turn({
            width: 800,
            height: 600,
            autoCenter: true,
            display: 'double',
            gradients: true,
            acceleration: true,
            pages: this.content.pages.length,
            when: {
                turning: (e, page, view) => {
                    // Update page indicator
                    const book = $(this);
                    const pageNumber = book.turn('page');
                    const totalPages = book.turn('pages');
                    $('#page-indicator').text(`Page ${pageNumber} of ${totalPages}`);
                    
                    // Update navigation buttons
                    $('#prev-page').prop('disabled', pageNumber === 1);
                    $('#next-page').prop('disabled', pageNumber === totalPages);
                }
            }
        });
    }
}

// Initialize the book when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    const book = new BookContent();
    book.loadContent();
}); 