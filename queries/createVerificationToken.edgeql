select (
  insert VerificationToken {
    identifier := <str>$identifier,
    token := <str>$token,
    expires := <datetime>$expires
  }
) {
  identifier,
  token,
  expires
}