---
title: Test post
date: 2021-07-26
tags:
  - test
---

<!-- comment -->

This post exists to test various features such as markdown-to-html conversion, table of contents generation, and metadata parsing.<br />

## Link

<a href="/search">Go to search</a>

## Image

<img src="/icon/icon.svg" alt="developomp icon" width="100">

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

css only causes pain[^css_bad] and python is overrated[^python_is_overrated].

## Code

Here's a `code`.

```python {7,12,14-15}
print("And here's a language-specific code block")
# with comments and line highlighting!

x = 256
y = 256

print(x is y) # True. id(x) is indeed equal to id(y)

z = 257
w = 257

print(z is w) # False. id(z) is not equal to id(w)

# Apparently python does this to save memory usage.
# All integers between -5 and 256 share the same id.
```

## Text styling

> blockquote
>
> > nested blockquote

**bold**<br />
_italic_<br />
~~strikethrough~~<br />
<u>underlined</u><br />
==marked==<br />
this is a ^superscript^ (soon^TM^)<br />
and this is a ~subscript~ (H~2~O)

## CSS styling

<p align="center">
	centered paragraph
</p>

<p style="color:rgb(255,0,0)">
	RED
</p>

## Key

Do you remember the first time you pressed <kbd>Ctrl</kbd>+<kbd>C</kbd> in terminal?

## TeX

[$KaTeX$](https://katex.org/docs/supported.html) syntax is supported.

using [mhchem](https://mhchem.github.io/MathJax-mhchem) for chemical formula.

### Inline

$e=mc^2$ is actually $e^2=(mc^2)^2 + (pc)^2$.

### Block

$$
	\ce{6 CO2 + 6 H2O <=>[{photosynthesis}][{respiration}] C6H12O6 + 6 O2}
$$

[^css_bad]: Based on my experience building this website, Dec 2021.
[^python_is_overrated]: Based on my infinite wisdom, Dec 2021.

## headers

Headers have different size and indentation depending on their level.

- Post title: `h1`
- this section: `h2`

### h3

Lorem ipsum blah blah.

#### h4

Lorem ipsum blah blah.

##### h5

Lorem ipsum blah blah.

###### h6

Lorem ipsum blah blah.
