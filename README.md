Movie Quotes is an App where can register or join by Google. in the app, you can see hundreds of movie quotes. you can add, edit, like and comment to movie quotes

#

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)

#

### Prerequisites

- _npm@7 and up_

#

### Tech Stack

- [VueJs@3.x](https://vuejs.org/guide/introduction.html) - front-end framework
- [Vee-validate@4.x](https://vee-validate.logaretm.com/v4/) - package for form validations
- [Tailwind CSS](https://tailwindcss.com) - CSS library
- [Pusher](https://pusher.com) - Real time notification package
- [Vuei18n](https://vue-i18n.intlify.dev/)- Package for translations
- [Vue 3 Google Login](https://yobaji.github.io/vue3-google-login/) - Google authentificaiton package

#

### Getting Started

1\. First, you need to clone Movie Quotes Upgraded repository from github:

```sh
git clone https://github.com/RedberryInternship/nugzar-rostiashvili-movie-quotes-front.git
```

2\. Next you need to run _npm install_ in order to install all the dependencies.

```sh
npm install
```

3\. Now we need to set our env file.

```sh
cp .env.example .env
```

And now you should provide **.env** file all the necessary environment variables:

#

**App urls:**

> VITE_BASE_URL=**\***

> VITE_IMAGE_BASE_URL=\*\*\*\*

> VITE_API_BASE_URL=\*\*\*

#

**Pusher:**

> VITE_PUSHER_KEY=\*\*\*

> VITE_PUSHER_APP_CLUSTER=**\***

##### Now, you should be good to go!

#

### Development

You can run Vite built-in development server by executing:

```sh
  npm run dev
```
