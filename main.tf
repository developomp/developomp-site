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
  records         = ["151.101.1.195", "151.101.65.195"]
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record
resource "aws_route53_record" "main_acme_challenge" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.developomp_com.zone_id
  name            = "_acme-challenge.${data.aws_route53_zone.developomp_com.name}"
  type            = "TXT"
  ttl             = 60
  records         = ["FCcgOpnrCBEMv1m4Z9NRqa4FlOW78CUVrfUQgGfb14o"]
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record
resource "aws_route53_record" "blog" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.developomp_com.zone_id
  name            = "blog.${data.aws_route53_zone.developomp_com.name}"
  type            = "A"
  ttl             = 60
  records         = ["199.36.158.100"]
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record
resource "aws_route53_record" "blog_acme_challenge" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.developomp_com.zone_id
  name            = "_acme-challenge.blog.${data.aws_route53_zone.developomp_com.name}"
  type            = "TXT"
  ttl             = 60
  records         = ["RXaOhzFg2U4ZtEU_Dj_2ylAX3D8xXpdRCq1KjoaB9Sc"]
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record
resource "aws_route53_record" "portfolio" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.developomp_com.zone_id
  name            = "portfolio.${data.aws_route53_zone.developomp_com.name}"
  type            = "A"
  ttl             = 60
  records         = ["199.36.158.100"]
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record
resource "aws_route53_record" "portfolio_acme_challenge" {
  allow_overwrite = true
  zone_id         = data.aws_route53_zone.developomp_com.zone_id
  name            = "_acme-challenge.portfolio.${data.aws_route53_zone.developomp_com.name}"
  type            = "TXT"
  ttl             = 60
  records         = ["YxFtDJ-Qf1yE8KX2mzf4cbfkPBR74IbbWX_0l5gGnLg"]
}
