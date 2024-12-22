fx_version "cerulean"
game "gta5"

client_script "dist/*.lua"
server_script "dist/*.lua"
shared_script '@ox_lib/init.lua'

ui_page "web/dist/index.html"

files {
	"web/dist/index.html",
	"web/dist/**/*",
}

lua54 'yes'
