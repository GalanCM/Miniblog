# Miniblog
I built this as a React code sample in early 2018. The original intent was to keep the blog very simple, and replicate it in various frameworks: React, Vue, Angular, Ember, Svelte, ect… In the end, I decided it was a better use of my time to build a more complex sample app instead. I'd still like to go back to this and implement a proper backend, but I have other priorities at the moment.

# Downloading
Before downloading make sure you have [Node](http://www.nodejs.org) and [Git](http://www.git-scm.com) installed on your machine.

Once you do, go to the directory you want to download it to using the commandline of your choice. Then clone the repository into the directory.
```bash
git clone https://github.com/GalanCM/Miniblog.git
```
Open the new folder.
```bash
cd Miniblog
```
And install the project dependancies 
```bash
npm install
```

# Building
There are two ways to build the project: in `dev` mode or `build` mode. 

`Dev` mode will rebuild the project whenever the files are changed. Test the app by opening index.html in a browser.
```bash
npm run dev
```

`Build` mode optimizes the project for production. Use this for a deployment-ready build. As above, opening index.html will allow you to run the app.
```bash
npm run build
```
