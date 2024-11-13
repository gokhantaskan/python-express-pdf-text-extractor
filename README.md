# PDF Text Extractor

This is a hybrid Node.js/Python service that provides robust PDF text extraction capabilities through a REST API. It combines the power of Python's PDF processing libraries with a Node.js web server to deliver a flexible and efficient text extraction solution.

## Features

- PDF text extraction using multiple methods:
  - Primary extraction using `pdfminer`
  - Fallback to OCR using `pytesseract` for image-based PDFs
- RESTful API built with Express
- Cross-origin resource sharing (CORS) enabled
- TypeScript for type safety and better development experience
- Error handling middleware
- File upload support via `multer`
- Docker support for easy deployment and development

## Requirements

### Using Docker (Recommended)
- Docker
- Docker Compose

### Manual Installation
- Node.js >= 18
- Python 3.x
- Required Python packages:
  - pdfminer
  - pdf2image
  - pytesseract
- Tesseract OCR (for image-based PDFs)

## Installation & Usage

### Using Docker (Recommended)

1. Clone the repository

2. Build and start the container:
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the Docker image with all required dependencies
   - Start the server on port 3000
   - Mount your local directory for development

3. For subsequent runs, simply use:
   ```bash
   docker-compose up
   ```

### Manual Installation

1. Clone the repository

2. Install Node.js dependencies:
   ```bash
   # `corepack enable` if you don't have pnpm installed
   pnpm install
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Install Tesseract OCR (platform specific):
   - macOS: `brew install tesseract`
   - Ubuntu: `sudo apt-get install tesseract-ocr`
   - Windows: Download installer from [GitHub](https://github.com/UB-Mannheim/tesseract/wiki)

5. Start the development server:
   ```bash
   pnpm dev
   ```

## API Usage

The API endpoint will be available at:
```
POST /api/parse-pdf
```
Send a PDF file in the request body to extract its text content.

## Project Structure

```
.
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Express middlewares
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── server.ts       # Express server setup
├── pdf_parser.py       # Python PDF processing script
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── requirements.txt   # Python dependencies
├── package.json       # Node.js dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

## License

ISC

## Author

This project is maintained by its contributors.
