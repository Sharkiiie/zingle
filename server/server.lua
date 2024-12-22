RegisterNetEvent('getServerData', function(cb)
    local data = {
        message = "Hello from the server!",
        timestamp = os.time()
    }
    cb(data)
end)
