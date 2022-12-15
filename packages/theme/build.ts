import { writeFileSync, mkdirSync, existsSync } from "fs"

import dark from "./src/dark"
import light from "./src/light"

if (!existsSync("dist")) mkdirSync("dist")

writeFileSync("dist/dark.json", JSON.stringify(dark))
writeFileSync("dist/light.json", JSON.stringify(light))
