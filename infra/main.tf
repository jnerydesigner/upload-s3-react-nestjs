terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.54.1"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "upload_bucket" {
  bucket = "s3-nest-react-2025"

  tags = {
    Name        = "s3-nest-react"
    Environment = "Development"
  }

}

resource "aws_s3_bucket_public_access_block" "upload_bucket_pab" {
  bucket = aws_s3_bucket.upload_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

  depends_on = [aws_s3_bucket.upload_bucket]
}

resource "aws_s3_bucket_policy" "upload_bucket_policy" {
  bucket = aws_s3_bucket.upload_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.upload_bucket.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.upload_bucket_pab]
}
