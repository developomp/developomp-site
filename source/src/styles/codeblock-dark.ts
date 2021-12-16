/**
 * from source/node_modules/highlight.js/styles/atom-one-dark-reasonable.css
 */

import { css } from "styled-components"

export default css`
	pre code.hljs {
		display: block;
		overflow-x: auto;
		padding: 1em;
	}
	code.hljs {
		padding: 3px 5px;
	}
	.hljs {
		color: #abb2bf;
		background: #282c34;
	}
	.hljs-keyword,
	.hljs-operator,
	.hljs-pattern-match {
		color: #f92672;
	}
	.hljs-function,
	.hljs-pattern-match .hljs-constructor {
		color: #61aeee;
	}
	.hljs-function .hljs-params {
		color: #a6e22e;
	}
	.hljs-function .hljs-params .hljs-typing {
		color: #fd971f;
	}
	.hljs-module-access .hljs-module {
		color: #7e57c2;
	}
	.hljs-constructor {
		color: #e2b93d;
	}
	.hljs-constructor .hljs-string {
		color: #9ccc65;
	}
	.hljs-comment,
	.hljs-quote {
		color: #b18eb1;
		font-style: italic;
	}
	.hljs-doctag,
	.hljs-formula {
		color: #c678dd;
	}
	.hljs-deletion,
	.hljs-name,
	.hljs-section,
	.hljs-selector-tag,
	.hljs-subst {
		color: #e06c75;
	}
	.hljs-literal {
		color: #56b6c2;
	}
	.hljs-addition,
	.hljs-attribute,
	.hljs-meta .hljs-string,
	.hljs-regexp,
	.hljs-string {
		color: #98c379;
	}
	.hljs-built_in,
	.hljs-class .hljs-title,
	.hljs-title.class_ {
		color: #e6c07b;
	}
	.hljs-attr,
	.hljs-number,
	.hljs-selector-attr,
	.hljs-selector-class,
	.hljs-selector-pseudo,
	.hljs-template-variable,
	.hljs-type,
	.hljs-variable {
		color: #d19a66;
	}
	.hljs-bullet,
	.hljs-link,
	.hljs-meta,
	.hljs-selector-id,
	.hljs-symbol,
	.hljs-title {
		color: #61aeee;
	}
	.hljs-emphasis {
		font-style: italic;
	}
	.hljs-strong {
		font-weight: 700;
	}
	.hljs-link {
		text-decoration: underline;
	}
`
