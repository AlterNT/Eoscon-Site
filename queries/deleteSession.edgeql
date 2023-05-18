select (
  delete Session 
  filter .sessionToken = <str>$sessionToken
) {
  expires,
  sessionToken,
  user: {
    id
  }
}