fx_version "cerulean"
game "gta5"

description "ESX Identity redesigned"
author "Var"

version "1.11.0"

lua54 "yes"

ui_page "web/build/index.html"

client_scripts { "client/*.lua" }

server_scripts {
	"@oxmysql/lib/MySQL.lua",
	"server/*.lua"
}

shared_scripts {
	"@es_extended/imports.lua",
	"@es_extended/locale.lua",
	"shared/*.lua",
	"locales/*.lua"
}

files {
	"web/build/index.html",
	"web/build/**/*"
}

dependency 'es_extended'