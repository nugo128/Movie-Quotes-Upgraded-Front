import * as landing_quotes from './landing-page.json'
import * as registration from './registration.json'
import * as login from './login.json'
import * as reset from './password-reset.json'
const translations = {
  ...reset,
  ...login,
  ...landing_quotes,
  ...registration
}

export default translations
