# vue-multi-project
一套vue+webpack，实现多个项目共存。
#### 前提
目前工作出现一个问题，多个项目均使用vue+webpack，并且项目之间有很多的组件或者方法都是相同的（粘贴复制），整体布局基本一样（只是主题颜色有些许不同）。感觉这样子后期维护繁杂，同一个问题需要修改很多遍。于是，在研究两天之后，生成了一套新的项目结构，基本改善了上述问题。
#### 项目结构
``` 
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
```

#### 实现过程
> ##### 1.首先进入项目根路径中的 config 文件夹，新增两个文件（ multipage.js、multipage.project.js ），分别是配置多页面和多项目切换的。
> ##### 2.然后修改 config 文件夹下的 index.js 文件。
> ##### 3.修改 build 文件夹下的 webpack.base.conf.js 、webpack.dev.conf.js 、webpack.prod.conf.js 。

这是需要修改的文件，具体怎么修改这里不再赘述，因为很多时候我们都是只要求实现，可以不用管原理。如果对实现过程有兴趣，可以看我的项目，用到了些许的 node 知识，文件中基本上都有对应的注释说明，可能有理解偏差，望评论指正。

---

#### 项目简介
> ##### 1.有两个项目（admin和master），src路径下的另一个文件夹 global 是存放一些项目公共文件（如组件或工具函数），此处存放的是vue官方的logo图片，两个项目都用到了。
> ##### 2. 每个项目中都有个 pages 文件夹，用来存放项目入口文件。
> ##### 3. 每个项目都有独自的 config 文件，文件内容：
``` javascript
	'use strict'
	module.exports = {
		name : 'admin',	//文件夹名称 和最后打包后文件夹的名称  /src/admin/
	}
```
> ##### 4. 可以直接拿来用！！！
