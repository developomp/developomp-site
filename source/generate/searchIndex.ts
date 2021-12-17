/**
 * @file generate index for searching
 */

import fs from "fs"
import elasticlunr from "elasticlunr"

import { outPath } from "./config"

const elasticlunrIndex = elasticlunr(function () {
	this.addField("title" as never)
	this.addField("body" as never)
	this.setRef("url" as never)
})

export function addDocument(doc: unknown) {
	elasticlunrIndex.addDoc(doc)
}

export function saveIndex() {
	fs.writeFileSync(outPath + "/search.json", JSON.stringify(elasticlunrIndex))
}
