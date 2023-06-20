import * as landing_quotes from './landing-page.json'
import * as registration from './registration.json'
import * as login from './login.json'
import * as reset from './password-reset.json'
import * as newsfeed from './newsfeed.json'
import * as profile from './profile.json'
const translations = {
  ...profile,
  ...newsfeed,
  ...reset,
  ...login,
  ...landing_quotes,
  ...registration
}

export default translations
