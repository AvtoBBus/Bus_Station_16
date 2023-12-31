﻿using HtmlAgilityPack;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit;
using ExpensesWebServer.Models.Entities;
using ExpensesWebServer.Services.Parsers;

namespace ExpensesWebServer.Services;

public class EmailReceiptsProvider : IDisposable
{
    private ImapClient _imapClient = new();
    public EmailReceiptsProvider()
    {
        _imapClient.Connect("imap.mail.ru", 993, true);
        _imapClient.Authenticate("expences_buffer@mail.ru", "iCDeqSmYam2VqvAwrQr8");
        _imapClient.Inbox.Open(FolderAccess.ReadWrite);
    }
    private IList<UniqueId> GetUidsByMail(string? email)
    {
        IList<UniqueId> uids;
        var criteria = SearchQuery.NotSeen;

        if (email != null)
        {
            var fromCreteria = SearchQuery.FromContains(email);
            var combinedCriteria = criteria.And(fromCreteria);
            uids = _imapClient.Inbox.Search(combinedCriteria);
        }
        else
        {
            uids = _imapClient.Inbox.Search(SearchQuery.NotSeen);
        }
        foreach (var uid in uids) _imapClient.Inbox.AddFlags(uid, MessageFlags.Seen, true);
        return uids;
    }
    public List<Expense> FetchReceitps(string? email)
    {
        var expenses = new List<Expense>();//= new List<Expense>();

        IList<UniqueId> uids = GetUidsByMail(email);

        foreach (var uid in uids)
        {
            var currentReceiptExpenses = new List<Expense>();

            var mimeMessage = _imapClient.Inbox.GetMessage(uid);
            var content = (mimeMessage.HtmlBody);

            var doc = new HtmlDocument(); // Get Receipt
            doc.LoadHtml(content);

            currentReceiptExpenses.AddRange(OfdPboParser.Parse(doc));
            if (currentReceiptExpenses.Count() > 0) // Case Pbo
            {
                expenses.AddRange(currentReceiptExpenses);
                continue;
            }

            currentReceiptExpenses.AddRange(OfdMarketParser.Parse(doc));
            if (currentReceiptExpenses.Count() > 0) // Case market
            {
                expenses.AddRange(currentReceiptExpenses);
                continue;
            }

            currentReceiptExpenses.AddRange(OfdLentaParser.Parse(doc));
            if (currentReceiptExpenses.Count() > 0) // Case market
            {
                expenses.AddRange(currentReceiptExpenses);
                continue;
            }

            expenses.Add(  // Last chance
                new Expense()
                {
                    CreationDate = DefaultParser.ParseDate(doc),
                    ExpenseDescription = mimeMessage.Subject,
                    Amount = DefaultParser.Parse(doc),
                });
        }
        _imapClient.Disconnect(true);
        return expenses;
    }
    public void Dispose()
    {
        _imapClient.Dispose();
    }
}
