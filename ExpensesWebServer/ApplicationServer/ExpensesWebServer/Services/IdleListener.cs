using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Office2010.CustomUI;
using ExpensesWebServer.Data;
using ExpensesWebServer.Models.Entities;
using ExpensesWebServer.Services.Parsers;
using HtmlAgilityPack;
using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Context = ExpensesWebServer.Data.Context;

namespace ExpensesWebServer.Services;


public class IdleListener : BackgroundService, IDisposable
{
    public const SecureSocketOptions SslOptions = SecureSocketOptions.Auto;
    public const string Host = "imap.mail.ru";
    public const int Port = 993;

    public const string Username = "expences_buffer@mail.ru";
    public const string Password = "iCDeqSmYam2VqvAwrQr8";
    private readonly IServiceScopeFactory _scopeFactory;

    private CancellationTokenSource _done;
    private readonly ImapClient _client;
    private bool _messagesArrived;


    public IdleListener(IServiceScopeFactory scopeFactory)
    {
        _client = new ImapClient();
        _scopeFactory = scopeFactory;
    }
    private async Task ReconnectAsync()
    {
        if (!_client.IsConnected)
            await _client.ConnectAsync(Host, Port, true);

        if (!_client.IsAuthenticated)
        {
            await _client.AuthenticateAsync(Username, Password);

            await _client.Inbox.OpenAsync(FolderAccess.ReadWrite);
        }
    }
    private async Task FetchNewMessagesAsync()
    {
        var expensesProvider = new EmailReceiptsProvider();
        using (var scope = _scopeFactory.CreateScope())
        {
            var expenseRepository = (ExpeseRepository)scope.ServiceProvider.GetRequiredService<IExpenseRepository>();
            var userRepository = (UserRepository)scope.ServiceProvider.GetRequiredService<IUserRepository>();
            var users = await userRepository.GetListOfObjects();
            foreach (var u in users)
            {
                if (u.Email == null) continue;
                var expenses = expensesProvider.FetchReceitps(u.Email);
                foreach (var e in expenses) e.UserId = u.Id;
                await expenseRepository.AddRangeAsync(expenses);
            }
        }
    }

    private async Task WaitForNewMessagesAsync()
    {
        do
        {
            if (_client.Capabilities.HasFlag(ImapCapabilities.Idle))
            {
                _done = new CancellationTokenSource(new TimeSpan(0, 1, 0));
                try
                {
                    await _client.IdleAsync(_done.Token);
                }
                finally
                {
                    _done.Dispose();
                    _done = null;
                }
            }
            else
            {
                await Task.Delay(new TimeSpan(0, 0, 1));
                await _client.NoOpAsync();
            }
            break;
        } while (true);
    }
    private async Task IdleAsync()
    {
        while(true)
        {
            try
            {
                await WaitForNewMessagesAsync();

                if (_messagesArrived)
                {
                    await FetchNewMessagesAsync();
                    _messagesArrived = false;
                }
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }
    }
    public async Task RunAsync()
    {
        try
        {
            await ReconnectAsync();
        }
        catch (OperationCanceledException)
        {
            await _client.DisconnectAsync(true);
            return;
        } 

        var inbox = _client.Inbox; 

        inbox.CountChanged += UnreadChanged;

        await IdleAsync();

        inbox.CountChanged -= UnreadChanged;

        await _client.DisconnectAsync(true);
    }
    private void UnreadChanged(object sender, EventArgs e)
    {
        // В РАНТАЙМЕ НЕ УДАЛЯЕМ СООБЩЕНИЯ!!!!
        _messagesArrived=true;
        _done?.Cancel();
    }
    public void Dispose()
    {
        _client.Dispose();

        GC.SuppressFinalize(this);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await RunAsync();
    }
}
