terraform {
  required_providers {
    # https://registry.terraform.io/providers/hashicorp/aws/latest/docs
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# required although unused
provider "aws" {
  region = "us-west-1" # just a random region (also used in .github/workflows/terraform.yml)
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/route53_zone
data "aws_route53_zone" "developomp_com" {
  name = "developomp.com"
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record
resource "aws_route53_record" "main" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.developomp_com.zone_id
  name            = data.aws_route53_zone.developomp_com.name
  type            = "A"
  ttl             = 60
  records         = ["76.76.21.21"]
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record
resource "aws_route53_record" "main_www" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.developomp_com.zone_id
  name            = "www.${data.aws_route53_zone.developomp_com.name}"
  type            = "CNAME"
  ttl             = 60
  records         = ["cname.vercel-dns.com."]
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record
resource "aws_route53_record" "blog" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.developomp_com.zone_id
  name            = "blog.${data.aws_route53_zone.developomp_com.name}"
  type            = "CNAME"
  ttl             = 60
  records         = ["cname.vercel-dns.com."]
}
