---
title: Test post
date: 2021-07-26
tags:
  - test
---

<!-- comment -->

This post exists to test various features such as markdown-to-html conversion, table of contents generation, and metadata parsing.<br />

## Link

<a href="/">Go to Homepage</a>

## Image

![alt text](/icon/icon.svg "title")

## Video

<div style="padding: 56.25% 0px 0px; position: relative;"><iframe src="https://www.youtube.com/embed/0jQRrChzdDQ?cc_load_policy=1&iv_load_policy=3&rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen scrolling="no"  style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"></iframe></div>

## Table

| align right | align center | align left |
| ----------: | :----------: | :--------- |
|         one |      A       | 1          |
|         two |      B       | 2          |
|       three |      C       | 3          |

## List

- Unordered list item
- Unordered list item
  - unordered list sub-item
  - unordered list sub-item
- [ ] Unordered task list item (unchecked)
- [x] Unordered task list item (checked)
  - [ ] unordered task list sub-item (unchecked)
  - [x] unordered task list sub-item (checked)

1. Ordered list item
2. Ordered list item
   1. ordered list sub item
   2. ordered list sub item
3. [ ] Ordered list task item (unchecked)
4. [x] Ordered list task item (checked)
   1. [ ] Ordered list task sub-item (unchecked)
   2. [x] Ordered list task sub-item (checked)

## Footnote

everyone should use tailwind[^use_tailwind] and pineapple belongs on pizza[^pineapple_pizza_truth].

## Code

Here's a `code`. Here are color chips `#FFFFFF` `#E06C75` `#61AFEF` `#E5C07B`.

```python
print("And here's a language-specific code block")
# with comments!

x = 256
y = 256

print(x is y) # True. id(x) is indeed equal to id(y)

z = 257
w = 257

print(z is w) # False. id(z) is not equal to id(w)

# Apparently python does this to save memory usage.
# All integers between -5 and 256 share the same id.
```

## block quotes

> blockquote
>
> > nested blockquote

## Text styling

**bold**
_italic_
~~strikethrough~~
<u>underlined</u>
==marked==
=a=marked with color amber==
=b=blue==
=c=cyan==
=d=brown==
=f=fuchsia==
=g=green==
=h=hotpink==
=l=lime==
=m=magenta==
=n=navyblue==
=o=orange==
=p=purple==
=q=pink==
=r=red==
=s=silver==
=t=teal==
=v=violet==
=x=gray==
=y=yellow==.

This is a ^superscript^ (soon^TM^) and this is a ~subscript~ (H~2~O)

<p align="center">
	centered paragraph
</p>

<p style="color:rgb(255,0,0)">
	RED
</p>

## Callouts & Directives

:::note
Some **content** with _Markdown_ `syntax`.
:::

:::commend
Some **content** with _Markdown_ `syntax`.
:::

:::warn
Some **content** with _Markdown_ `syntax`.
:::

:::deter
Some **content** with _Markdown_ `syntax`.
:::

:::assert
Some **content** with _Markdown_ `syntax`.
:::

:::note{title="Custom <u>title</u> using **directives**"}
Some **content** with _Markdown_ `syntax`.
:::

## Key

Do you remember the first time you pressed <kbd>Ctrl</kbd>+<kbd>C</kbd> in terminal?

## TeX

[$KaTeX$](https://katex.org/docs/supported.html) syntax is supported.

using [mhchem](https://mhchem.github.io/MathJax-mhchem) for chemical formula.

### Inline

$e=mc^2$ is actually $e^2=(mc^2)^2 + (pc)^2$.

### Block

$$
    \text{The formula for normal distribution is} \space
    f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{1}{2}(\frac{x-\mu}{\sigma})^2}
$$

## headers

# h1

content

## h2

content

### h3

content

#### h4

content

##### h5

content

###### h6

content

<!-- Footnotes -->

[^use_tailwind]: Based on my experience building this website
[^pineapple_pizza_truth]: Based on my infinite wisdom
