select (
  insert User {
    name := <optional str>$name,
    image := <optional str>$image,
    email := <str>$email,
    emailVerified := <optional datetime>$emailVerified,
  }
) {
  id,
  name,
  image,
  email,
  emailVerified,
  is_admin
}