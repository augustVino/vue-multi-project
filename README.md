# vue-multi-project

> A Vue.js project

The files tree is:
=================
    |__ build
        |__ build.js
        |__ check-versions.js
        |__ logo.png
        |__ utils.js
        |__ vue-loader.conf.js
        |__ webpack.base.conf.js
        |__ webpack.dev.conf.js
        |__ webpack.prod.conf.js
    |__ config
        |__ dev.env.js
        |__ index.js
        |__ multipage.js
        |__ multipage.project.js
        |__ prod.env.js
        |__ test.env.js
    |__ dist
        |__ admin
            |__ favicon.ico
            |__ index.html
            |__ static
                |__ css
                    |__ index.3a947c1c1f207832148c696e78c1f1bd.css
                    |__ index.3a947c1c1f207832148c696e78c1f1bd.css.map
                |__ js
                    |__ index.3675151582d13b8e0c7e.js
                    |__ index.3675151582d13b8e0c7e.js.map
                    |__ manifest.2ae2e69a05c33dfc65f8.js
                    |__ manifest.2ae2e69a05c33dfc65f8.js.map
                    |__ vendor.7fed9fa7b7ba482410b7.js
                    |__ vendor.7fed9fa7b7ba482410b7.js.map
        |__ master
            |__ favicon.ico
            |__ index.html
            |__ static
                |__ css
                    |__ index.7cb8a531774c9910737734e1c15db140.css
                    |__ index.7cb8a531774c9910737734e1c15db140.css.map
                |__ js
                    |__ index.0f86190d29b252e0535a.js
                    |__ index.0f86190d29b252e0535a.js.map
                    |__ manifest.2ae2e69a05c33dfc65f8.js
                    |__ manifest.2ae2e69a05c33dfc65f8.js.map
                    |__ vendor.7fed9fa7b7ba482410b7.js
                    |__ vendor.7fed9fa7b7ba482410b7.js.map
    |__ node_modules
    |__ src
        |__ admin
            |__ components
                |__ HelloWorld.vue
            |__ config
                |__ index.js
            |__ pages
                |__ index
                  |__ App.vue
                  |__ favicon.ico
                  |__ index.html
                  |__ index.js
            |__ router
                |__ index.js
        |__ global
            |__ assets
                |__ logo.png
        |__ master
            |__ components
                |__ HelloWorld.vue
            |__ config
                |__ index.js
            |__ pages
                |__ index
                    |__ App.vue
                    |__ favicon.ico
                    |__ index.html
                    |__ index.js
            |__ router
                |__ index.js
    |__ static
        |__ .gitkeep
    |__ test
    |__ .babelrc
    |__ .editorconfig
    |__ .gitignore
    |__ .postcssrc.js
    |__ package-lock.json
    |__ package.json
    |__ README.md



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

