local loadingScreenFinished = false
local ready = false
local NuiEnabled = false
local timecycleModifier = "hud_def_blur"

RegisterNetEvent("esx_identity:alreadyRegistered", function()
    while not loadingScreenFinished do
        Wait(100)
    end
    TriggerEvent("esx_skin:playerRegistered")
end)

RegisterNetEvent("esx_identity:setPlayerData", function(data)
    SetTimeout(1, function()
        ESX.SetPlayerData("name", ("%s %s"):format(data.firstName, data.lastName))
        ESX.SetPlayerData("firstName", data.firstName)
        ESX.SetPlayerData("lastName", data.lastName)
        ESX.SetPlayerData("dateofbirth", data.dateOfBirth)
        ESX.SetPlayerData("sex", data.sex)
        ESX.SetPlayerData("height", data.height)
    end)
end)

AddEventHandler("esx:loadingScreenOff", function()
    loadingScreenFinished = true
end)

if not Config.UseDeferrals then

    function toggleNuiFrame(shouldShow)
        SetNuiFocus(shouldShow, shouldShow)

        NuiEnabled = shouldShow

        if shouldShow then
            SetTimecycleModifier(timecycleModifier)
        else
            ClearTimecycleModifier()
        end

        SendReactMessage('setVisible', shouldShow)
    end

    RegisterNetEvent("esx_identity:showRegisterIdentity", function()
        TriggerEvent("esx_skin:resetFirstSpawn")
        while not (loadingScreenFinished) do
            print("Waiting for esx_identity NUI..")
            Wait(100)
        end
        if not ESX.PlayerData.dead then
            toggleNuiFrame(true)
        end
    end)

    RegisterNUICallback("register", function(data, cb)
        if not NuiEnabled then
            return
        end

        ESX.TriggerServerCallback("esx_identity:registerIdentity", function(callback)
            if not callback then
                return
            end

            ESX.ShowNotification(TranslateCap("thank_you_for_registering"))
            toggleNuiFrame(false)

            if not ESX.GetConfig().Multichar then
                TriggerEvent("esx_skin:playerRegistered")
            end
        end, data)
        cb(1)
    end)
end

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  cb(0)
end)