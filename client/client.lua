RegisterNUICallback('npwd:zingle:getBalance', function(data, cb)
    -- TriggerServerEvent('npwd:zingle:getBalance', function(serverData)
    --     cb(serverData)
    -- end)
    -- Lib cb?
    lib.notify({
        title = 'Get Balance',
        description = 'Yippe!',
        type = 'success'
    })
end)
