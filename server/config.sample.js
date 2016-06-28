module.exports = {
  appName: '<app_name>',
  secret: '<secret>',
  email: {
    testPath: '<test_path_for_example_http://domain.com/exams',
    service: '<for_example_Gmail_or_other_service>',
    auth: {
      host: '<for_gmail_use_:_smtps://user%40gmail.com:pass@smtp.gmail.com>',
      user: '<email_to_send_from>',
      pass: '<email_acct_pssword>',
      sender_name: '<sender_name>'
    }
  }
};