$serverName = "localhost,1433"
$databaseName = "master"
$userId = "sa"
$strongPsswd = "o*&KA&Ztq)I6=@&jSXAB,fV,"

$connectionString = "Server=$serverName;Database=$databaseName;User Id=$userId;Password=$strongPsswd;TrustServerCertificate=True;"
Write-Host $connectionString
$newDbName = "ExpensesProjectDB"
$createDbQuery = "CREATE DATABASE [$newDbName]"

$connection = New-Object System.Data.SqlClient.SqlConnection
$connection.ConnectionString = $connectionString

try {
    $connection.Open()
    Write-Host "Connected successfully to server: $serverName"

    $command = $connection.CreateCommand()
    $command.CommandText = $createDbQuery
    $command.ExecuteNonQuery()
    Write-Host "Database "$newDbName" created successfully"

} catch {
    Write-Host "Error: $_"
} finally {
    $connection.Close()
}