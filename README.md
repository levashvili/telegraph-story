# Telegraph Story

An interactive digital storybook created with Turn.js, featuring page-turning animations and a beautiful user interface.

## Features

- Interactive page-turning animations
- Responsive design that works on all devices
- Beautiful cover page with hover effects
- Table of contents navigation
- Keyboard navigation support
- Dynamic content loading from JSON
- Easy content management

## Getting Started

### Prerequisites

- A modern web browser
- Python 3.x (for local development server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/levashvili/telegraph-story.git
cd telegraph-story
```

2. Start the local development server:
```bash
python3 -m http.server 8000
```

3. Open your browser and visit:
```
http://localhost:8000
```

## Project Structure

```
telegraph-story/
├── content/
│   └── book.json      # Book content and metadata
├── illustrations/     # Book illustrations
│   ├── cover.jpg
│   ├── chapter1/
│   ├── chapter2/
│   └── chapter3/
├── js/
│   └── book-content.js # Book rendering logic
├── index.html        # Main HTML file
└── style.css         # Styles
```

## Customizing the Book

1. Edit `content/book.json` to modify:
   - Book title and author
   - Page content
   - Image paths and captions
   - Chapter structure

2. Add your illustrations to the `illustrations` directory following the structure in `book.json`

3. Customize styles in `style.css`

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Turn.js for page-turning animations
- jQuery (required by Turn.js)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
