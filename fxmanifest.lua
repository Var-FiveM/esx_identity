fx_version "cerulean"
games { "gta5", "rdr3" }

description "Basic React (TypeScript) with Taildwind and Shadcn UI & Lua Game Scripts Boilerplate"
author "Project Error and Skafir"
version '1.5.0'

lua54 'yes'

ui_page 'web/dist/index.html'

client_script "client/**/*"

files {
	'web/dist/index.html',
	'web/dist/**/*',
}