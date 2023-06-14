import * as landing_quotes from './landing-page.json'
import * as registration from './registration.json'
import * as login from './login.json'
const translations = {
  ...login,
  ...landing_quotes,
  ...registration
}

export default translations
