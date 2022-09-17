/**
 * @file generate index for searching
 */

import fs from "fs"
import elasticlunr from "elasticlunr"

import { searchIndexFilePath } from "./config"

const elasticlunrIndex = elasticlunr(function () {
	this.addField("title" as never)
	this.addField("body" as never)
	this.setRef("url" as never)
})

export function addDocument(doc: {
	title?: unknown
	body?: string
	url?: string
}) {
	elasticlunrIndex.addDoc(doc)
}

export function saveIndex() {
	fs.writeFileSync(searchIndexFilePath, JSON.stringify(elasticlunrIndex))
}
