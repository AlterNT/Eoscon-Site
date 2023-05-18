select (
  insert Session {
    expires := <datetime>$expires,
    sessionToken := <str>$sessionToken,

    user := (
      select User
      filter .id = <uuid>$userId
    )
  }
) {
  expires,
  sessionToken
}