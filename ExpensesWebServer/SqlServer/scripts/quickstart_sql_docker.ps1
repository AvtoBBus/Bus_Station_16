$length = 24  

$lowercase = "abcdefghijklmnopqrstuvwxyz"
$uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
$numbers = "0123456789"
$specialChars = "!#$%&()*,./:?@+<=>"

$charSet = $lowercase + $uppercase + $numbers + $specialChars

# Generate the random password
$strongPsswd = -join ((1..$length) | ForEach-Object { Get-Random -Maximum $charSet.Length | ForEach-Object { $charSet[$_]} })

# Log password
$logPath = ".\text.txt"
$strongPsswd | Add-Content -Path $logPath

docker pull mcr.microsoft.com/mssql/server
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=K@%P@/edl3T9S>CXe1TL3z##" -p 1433:1433 --name sql_server_expenses -d mcr.microsoft.com/mssql/server
