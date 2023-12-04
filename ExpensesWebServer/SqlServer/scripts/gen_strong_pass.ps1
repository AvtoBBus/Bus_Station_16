$length = 16  # You can change the length of the password

# Define the character sets
$lowercase = 'abcdefghijklmnopqrstuvwxyz'
$uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
$numbers = '0123456789'
$specialChars = '!#$%&()*,./:;?@[]_{|}+<=>'

# Create an array containing the character sets
$charSet = $lowercase + $uppercase + $numbers + $specialChars

# Generate the random password
$password = -join ((1..$length) | ForEach-Object { Get-Random -Maximum $charSet.Length | ForEach-Object { $charSet[$_]} })
#$logPath = ".\text.txt"
#$password | Add-Content -Path $logPath
Write-Host $password
