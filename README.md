# Color Contrast Matrix

A web-based tool that helps designers and developers check color contrast ratios between multiple colors simultaneously, ensuring WCAG 2.0 compliance.

## Features

- Check multiple color combinations at once
- Real-time color previews
- Dynamic addition of color fields
- Visual indicators for contrast levels:
  - ✓ Good contrast (ratio ≥ 4.5:1) - Safe to use
  - ▲ Moderate contrast (ratio ≥ 3.0:1) - Acceptable for large text only (18pt+, or 14pt+ if bold)
  - × Poor contrast - Do not use
- Mobile-responsive design
- No server-side dependencies

## Usage

1. Visit the [Color Contrast Matrix](https://RichardNesbitt.github.io/color-contrast-matrix) page
2. Enter hex color codes in the input fields (with or without #)
3. Add more color fields if needed using the "Add Another Color" button
4. Click "Generate Matrix" to see the contrast comparison results

## Development

To run this project locally:

1. Clone the repository:

```bash
git clone https://github.com/RichardNesbitt/color-contrast-matrix.git
```

2. Open `index.html` in your browser

No build process or server is required - it's purely client-side JavaScript.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Author

Richard Nesbitt
[RichardNesbitt.com](https://richardnesbitt.com)
