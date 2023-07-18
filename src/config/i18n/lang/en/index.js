import * as landing_quotes from './landing-page.json'
import * as registration from './registration.json'
import * as login from './login.json'
import * as reset from './password-reset.json'
import * as newsfeed from './newsfeed.json'
import * as profile from './profile.json'
import * as notifications from './notifications.json'
import * as user_movies from './user-movies.json'
import * as error_pages from './error-pages.json'
const translations = {
  ...error_pages,
  ...user_movies,
  ...notifications,
  ...profile,
  ...newsfeed,
  ...reset,
  ...login,
  ...landing_quotes,
  ...registration
}

export default translations
