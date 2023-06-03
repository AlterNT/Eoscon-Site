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
  user: {
    id
  },
  expires,
  sessionToken
}