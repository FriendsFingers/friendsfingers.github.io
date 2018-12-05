# FriendsFingers Website

The source code for FriendsFingers DApp. 

Live here [https://www.friendsfingers.com](https://www.friendsfingers.com/)

FriendsFingers helps startups and small businesses to start a trustworthy Crowdsale on Ethereum blockchain with no setup costs and zero lines of code required. 

## Download and Installation

```bash
git clone https://github.com/FriendsFingers/friendsfingers.github.io.git
cd friendsfingers.github.io
gem install jekyll bundler
bundle install
npm install
gulp
```

## Usage

### Run locally

```bash
bundle exec jekyll serve --config _config-dev.yml
```

Go to [http://localhost:4000](http://localhost:4000)


### Build

#### Gulp Tasks

- `gulp` the default task that builds everything
- `gulp sass` compiles SCSS files into CSS
- `gulp minify-css` minifies the compiled CSS file
- `gulp minify-js` minifies the themes JS file
- `gulp watch` watches JS and SCSS files and makes previous tasks
- `gulp copy` copies dependencies from node_modules to the vendor directory

## Helpful Links
 
Web3.js [Doc](http://web3js.readthedocs.io/en/1.0/index.html) [GitHub](https://github.com/ethereum/web3.js/)
   
Truffle Contract [GitHub](https://github.com/trufflesuite/truffle-contract)
 
Jekyll [Doc](https://jekyllrb.com/docs/home/) [GitHub](https://github.com/jekyll/jekyll)

## Bugs and Issues

Have a bug? [Open a new issue](https://github.com/FriendsFingers/friendsfingers.github.io/issues).

## Copyright and License

Copyright 2018 FriendsFingers. Code released under the [MIT](https://github.com/FriendsFingers/friendsfingers.github.io/blob/master/LICENSE) license.
