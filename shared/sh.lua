Config                 = {}
Config.Locale          = GetConvar('esx:locale', 'en')

-- [Config.EnableCommands]
-- Enables Commands Such As /char and /chardel
Config.EnableCommands  = ESX.GetConfig().EnableDebug

-- EXPERIMENTAL Character Registration Method
Config.UseDeferrals    = false

-- These values are for the second input validation in server/main.lua
Config.MaxNameLength   = 20                          -- Max Name Length.
Config.MinHeight       = 120                         -- 120 cm lowest height
Config.MaxHeight       = 220                         -- 220 cm max height.

Config.FullCharDelete  = true                        -- Delete all reference to character.
Config.EnableDebugging = ESX.GetConfig().EnableDebug -- prints for debugging :)