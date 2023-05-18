select (
  delete VerificationToken
  filter (.identifier, .token) = (<str>$identifier , <str>$token)
) {
  identifier,
  token,
  expires
}