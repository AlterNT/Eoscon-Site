select (
  insert User {
    name := <str>$name,
    image := <str>$image,
    email := <str>$email,
    emailVerified := <datetime>$emailVerified,
  }
) {
  id,
  name,
  image,
  email,
  emailVerified,
  is_admin
}