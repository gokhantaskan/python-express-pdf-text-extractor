import sys
import json
import os
import logging
from pdfminer.high_level import extract_text
from pdf2image import convert_from_path
import pytesseract
import tempfile

logging.basicConfig(level=logging.INFO)

class FileExtractionErrorPDF(Exception):
    def __init__(self, detail=None):
        self.detail = detail
        super().__init__(self.detail)

class PDFExtractor:
    @staticmethod
    def to_text(file_path):
        try:
            extracted_text = extract_text(file_path)
            if not extracted_text.strip():
                logging.error("No text extracted by pdfminer, trying image-based extraction")
                extracted_text = PDFExtractor.extract_text_from_image_pdf(file_path)
            # Sanitize the extracted text
            extracted_text = PDFExtractor.sanitize_text(extracted_text)
            return extracted_text
        except Exception as err:
            logging.error(f"Error during text extraction: {str(err)}")
            raise FileExtractionErrorPDF(str(err))

    @staticmethod
    def sanitize_text(text):
        # Remove null bytes and other potentially problematic characters
        text = text.replace("\x00", "")
        # Replace other non-printable characters
        text = "".join(
            char for char in text if char.isprintable() or char in ["\n", "\r", "\t"]
        )
        return text

    @staticmethod
    def extract_text_from_image_pdf(pdf_path):
        try:
            pages = convert_from_path(pdf_path)
            extracted_text = []
            for page_number, page in enumerate(pages):
                text = pytesseract.image_to_string(page)
                extracted_text.append(text)
            full_text = "\n".join(extracted_text)
            return full_text
        except Exception as err:
            logging.error(f"Error during image-based extraction: {str(err)}")
            raise FileExtractionErrorPDF(str(err))

def process_pdf_from_stdin():
    try:
        # Read PDF data from stdin as binary
        pdf_data = sys.stdin.buffer.read()
        
        if not pdf_data:
            error_result = {'success': False, 'error': 'No PDF data received'}
            print(json.dumps(error_result), file=sys.stderr)
            sys.exit(1)

        # Validate PDF signature
        if not pdf_data.startswith(b'%PDF'):
            error_result = {'success': False, 'error': 'Not a valid PDF file'}
            print(json.dumps(error_result), file=sys.stderr)
            sys.exit(1)
        
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf', mode='wb') as tmp_file:
            tmp_file.write(pdf_data)
            tmp_path = tmp_file.name
        
        try:
            # Extract text
            text = PDFExtractor.to_text(tmp_path)
            
            if not text.strip():
                error_result = {'success': False, 'error': 'No text could be extracted from the PDF'}
                print(json.dumps(error_result), file=sys.stderr)
                sys.exit(1)
            
            # Print the result as JSON to stdout
            result = {
                'success': True,
                'text': text
            }
            print(json.dumps(result))
            sys.stdout.flush()
            
        finally:
            # Clean up temp file
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
                
    except Exception as e:
        # Handle errors
        error_result = {
            'success': False,
            'error': str(e)
        }
        print(json.dumps(error_result), file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    process_pdf_from_stdin()