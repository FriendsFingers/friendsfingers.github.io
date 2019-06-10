const App = {
  legacy: false,
  web3: null,
  web3Provider: null,
  etherscanLink: '',
  metamask: {
    installed: false,
    netId: null
  },
  contracts: {},

  init: async function () {
    return App.initWeb3(true);
  },

  setTestnet: function () {
    web3Provider = DEMO_web3Provider;
    etherscanLink = DEMO_etherscanLink;
    networkId = DEMO_networkId;
    networkName = DEMO_networkName;
    FriendsFingersBuilderAddress = DEMO_FriendsFingersBuilderAddress;
    crowdsaleUrl = DEMO_crowdsaleUrl;
    restartUrl = DEMO_restartUrl;
  },

  initWeb3: async function (checkWeb3) {
    return new Promise((resolve) => {
      App.etherscanLink = etherscanLink;
      if (checkWeb3 && (typeof ethereum !== 'undefined' || typeof web3 !== 'undefined')) {
        if (ethereum) {
          console.log('injected web3');
          App.web3Provider = ethereum;
        } else {
          console.log('injected web3 (legacy)');
          App.web3Provider = web3.currentProvider;
          App.legacy = true;
        }

        App.web3 = new Web3(App.web3Provider);
        App.metamask.installed = true;
        App.web3.version.getNetwork(async function (err, netId) {
          if (err) {
            console.log(err);
          }
          App.metamask.netId = netId;
          if (netId !== networkId) {
            App.web3Provider = new Web3.providers.HttpProvider(web3Provider);
            App.web3 = new Web3(App.web3Provider);
          }

          resolve();
        });
      } else {
        console.log('provided web3');
        // set the provider you want from Web3.providers
        App.web3Provider = new Web3.providers.HttpProvider(web3Provider);
        App.web3 = new Web3(App.web3Provider);
        resolve();
      }
    });
  },

  initBuilder: async function () {
    return new Promise((resolve) => {
      $.getJSON(abiPath + 'FriendsFingersBuilder.json', function (data) {
        App.contracts.FriendsFingersBuilder = TruffleContract(data);
        App.contracts.FriendsFingersBuilder.setProvider(App.web3Provider);
        resolve();
      });
    });
  },

  initCrowdsale: async function (crowdsaleAbi) {
    crowdsaleAbi = crowdsaleAbi ? crowdsaleAbi : 'FriendsFingersCrowdsale.json';
    return new Promise((resolve) => {
      $.getJSON(abiPath + crowdsaleAbi, function (data) {
        App.contracts.FriendsFingersCrowdsale = TruffleContract(data);
        App.contracts.FriendsFingersCrowdsale.setProvider(App.web3Provider);
        resolve();
      });
    });
  },

  initToken: async function (tokenAbi) {
    tokenAbi = tokenAbi ? tokenAbi : 'FriendsFingersToken.json';
    return new Promise((resolve) => {
      $.getJSON(abiPath + tokenAbi, function (data) {
        App.contracts.FriendsFingersToken = TruffleContract(data);
        App.contracts.FriendsFingersToken.setProvider(App.web3Provider);
        resolve();
      });
    });
  },

  home: async function (crowdsaleAddress) {
    /*
    await App.init();

    await App.initCrowdsale();

    new Vue({
        el: '#top-head',
        data: {
            contract: null,
            crowdsale: {
                cap: 0,
                weiRaised: 0,
                progress: 0
            }
        },
        methods: {
            switchModule: async function () {
                if (this.crowdsale.hasStarted) {
                    $('.timer').addClass('d-none');
                    $('#top-head').removeClass('d-none');
                    const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
                    this.crowdsale.cap = App.web3.fromWei(await crowdsale.cap()).valueOf();

                    this.getRaised();

                    const self = this;
                    setInterval(function () {
                        self.getRaised();
                    }, 5000);
                } else {
                    new TimezZ('.j-timer', {
                        date: 'February 24, 2018 12:00:00',
                        daysName: 'DD',
                        hoursName: 'HH',
                        minutesName: 'MM',
                        secondsName: 'SS',
                        tagNumber: 'div',
                        tagLetter: 'div',
                        stop: false,
                    });
                    this.timeCheck();
                }
            },
            timeCheck: function () {
                this.crowdsale.hasStarted = Date.now() > this.crowdsale.startTime;

                if (!this.crowdsale.hasStarted) {
                    const self = this;
                    setTimeout(function () {
                        self.timeCheck();
                    }, 1000);
                } else {
                    this.switchModule();
                }
            },
            getRaised: async function () {
                const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
                this.crowdsale.weiRaised = App.web3.fromWei(await crowdsale.weiRaised()).valueOf();
                this.crowdsale.progress = this.crowdsale.weiRaised * 100 / this.crowdsale.cap;
            }
        },
        created: async function () {
            this.crowdsale.startTime = 1519470000 * 1000;
            this.crowdsale.hasStarted = Date.now() > this.crowdsale.startTime;
            this.switchModule();
        }
    });
    */
  },

  bountyProgram: async function () {
    document.location.href = 'https://app.friendsfingers.com/faucet';

    await App.init();

    Vue.use(VeeValidate);

    new Vue({
      el: '#bounty-program',
      data: {
        address_error: false,
        copied: false,
        wallet: '',
        email: '',
        telegram: '',
        postlink: ''
      },
      methods: {
        subscribeBounty: function () {
          this.address_error = (this.wallet !== '' && !App.web3.isAddress(this.wallet));

          if (this.address_error) {
            return;
          }

          this.$validator.validateAll().then(function (result) {

            if (result) {
              $('#mc-embedded-subscribe-form').submit();
            } else {
              console.log("some errors");
            }
          });
        },
        copyLink: function () {
          if (this.wallet !== '' && !this.address_error) {
            document.querySelector("#mce-LINK").select();
            try {
              this.copied = document.execCommand("copy");
            } catch (err) {
              this.copied = false;
            }
          }
        }
      },
      computed: {
        generateLink: function () {
          this.address_error = (this.wallet !== '' && !App.web3.isAddress(this.wallet));
          return (this.wallet === '' || this.address_error) ? '' : "https://www.friendsfingers.com/?utm_campaign=bounty&utm_source=" + this.wallet;
        }
      }
    });
  },

  builder: async function () {
    await App.init();

    Vue.use(VeeValidate);
    await App.initBuilder();

    new Vue({
      el: '#crowdsale-start',
      data: {
        demo: networkId !== "1",
        minStartDate: '',
        maxStartDate: '',
        minEndDate: '',
        maxEndDate: '',
        txError: false,
        txHash: '',
        crowdsaleLink: '',
        addressLink: '',
        makingTransaction: false,
        formDisabled: false,
        countryAgreement: false,
        globalAgreement: false,
        crowdsale: {
          id: '',
          address: '',
          projectInfo: {}
        },
        token: {
          decimals: 18
        }
      },
      created: function () {
        this.$validator.extend('eth_address', {
          getMessage: field => 'Insert a valid Ethereum wallet address.',
          validate: value => App.web3.isAddress(value)
        });

        this.$validator.extend('date_start_min', {
          getMessage: field => 'Start date must be at least ' + moment().add(5, 'minutes').format('DD-MM-YYYY HH:mm'),
          validate: value => moment(value).isAfter(moment().add(5, 'minute'))
        });

        this.$validator.extend('date_end_min', {
          getMessage: field => 'End date must be after start date and not more than 30 days after start',
          validate: value => moment(value).isBetween(moment(this.crowdsale.startTime).add(1, 'minute'), moment(this.crowdsale.startTime).add(30, 'day'))
        });
      },
      methods: {
        startCrowdsale: function () {
          if (!App.metamask.installed) {
            alert("To create a Crowdsale please install the MetaMask extension!");
            return;
          } else {
            if (App.metamask.netId !== networkId) {
              alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
              return;
            }
          }

          this.$validator.validateAll().then(async (result) => {
            if (result) {
              if (!App.legacy) {
                await App.web3Provider.enable();
              }

              console.log('starting');
              const builder = await App.contracts.FriendsFingersBuilder.at(FriendsFingersBuilderAddress);

              const name = this.token.name;
              const symbol = this.token.symbol.toUpperCase();
              const decimals = new App.web3.BigNumber(this.token.decimals);
              const cap = App.web3.toWei(this.crowdsale.cap, "ether");
              const goal = App.web3.toWei(this.crowdsale.goal, "ether");
              const creatorSupply = new App.web3.BigNumber(this.crowdsale.creatorSupply * Math.pow(10, this.token.decimals));
              const startTime = new Date(this.crowdsale.startTime).getTime() / 1000;
              const endTime = new Date(this.crowdsale.endTime).getTime() / 1000;
              const rate = new App.web3.BigNumber(this.crowdsale.rate);
              const wallet = this.crowdsale.wallet;

              const crowdsaleInfo = JSON.stringify(this.crowdsale.projectInfo);

              try {
                this.txError = false;
                this.txHash = '';
                this.formDisabled = true;
                this.makingTransaction = true;

                const log = await builder.startCrowdsale(
                  name,
                  symbol,
                  decimals,
                  cap,
                  goal,
                  creatorSupply,
                  startTime,
                  endTime,
                  rate,
                  wallet,
                  crowdsaleInfo
                );

                console.log(log);

                this.txHash = log.tx;
                this.trxLink = App.etherscanLink + "/tx/" + this.txHash;

                await App.initCrowdsale();
                const event = log.logs.find(e => e.event === 'CrowdsaleStarted');

                if (typeof event === 'undefined') {
                  this.txError = true;
                  this.formDisabled = false;
                  alert("Some error occurred. Maybe transaction failed for some reasons. Check your transaction id.");
                  return;
                }

                const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(event.args.ffCrowdsale);

                this.crowdsale.address = crowdsale.address;
                this.crowdsale.id = parseInt(await crowdsale.id());

                this.crowdsaleLink = crowdsaleUrl + '?id=' + this.crowdsale.id;
                this.addressLink = App.etherscanLink + "/address/" +  this.crowdsale.address;
              } catch (e) {
                this.makingTransaction = false;
                this.formDisabled = false;
                alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
                console.log(e);
              }
            } else {
              console.log("some errors");
            }
          });
        }
      }
    });
  },

  restart: async function (crID) {
    await App.init();

    Vue.use(VeeValidate);

    new Vue({
      el: '#crowdsale-start',
      data: {
        demo: networkId !== "1",
        minStartDate: '',
        maxStartDate: '',
        minEndDate: '',
        maxEndDate: '',
        txError: false,
        txHash: '',
        crowdsaleLink: '',
        addressLink: '',
        makingTransaction: false,
        formDisabled: false,
        countryAgreement: false,
        globalAgreement: false,
        crowdsale: {
          ffContract: true,
          id: '',
          address: '',
          cap: 0,
          goal: 0,
          weiRaised: 0,
          soldTokens: 0,
          rate: 0,
          oldRate: 0,
          startTime: 0,
          endTime: 0,
          wallet: '',
          hasStarted: false,
          hasEnded: true,
          paused: true,
          isFinalized: false,
          projectInfo: {}
        },
        token: {
          decimals: 18
        }
      },
      created: async function () {

        await App.initBuilder();
        await App.initCrowdsale();
        await App.initToken();

        this.$validator.extend('eth_address', {
          getMessage: field => 'Insert a valid Ethereum wallet address.',
          validate: value => App.web3.isAddress(value)
        });

        this.$validator.extend('date_start_min', {
          getMessage: field => 'Start date must be at least ' + moment().add(5, 'minutes').format('DD-MM-YYYY HH:mm'),
          validate: value => moment(value).isAfter(moment().add(5, 'minute'))
        });

        this.$validator.extend('date_end_min', {
          getMessage: field => 'End date must be after start date and not more than 30 days after start',
          validate: value => moment(value).isBetween(moment(this.crowdsale.startTime).add(1, 'minute'), moment(this.crowdsale.startTime).add(30, 'day'))
        });

        const builder = await App.contracts.FriendsFingersBuilder.at(FriendsFingersBuilderAddress);

        this.crowdsaleAddress = await builder.crowdsaleList(crID);

        if (parseInt(this.crowdsaleAddress) === 0) {
          window.location.href = window.location.origin + '/not-found';
          return;
        }

        const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(this.crowdsaleAddress);
        const token = await App.contracts.FriendsFingersToken.at(await crowdsale.token());

        this.token.address = token.address;
        this.token.name = await token.name();
        this.token.symbol = await token.symbol();
        this.token.decimals = (await token.decimals()).valueOf();

        this.crowdsale.address = crowdsale.address;
        this.crowdsale.cap = App.web3.fromWei(await crowdsale.cap()).valueOf();
        this.crowdsale.oldRate = (await crowdsale.rate()).valueOf();
        this.crowdsale.wallet = await crowdsale.wallet();
        this.crowdsale.projectInfo = JSON.parse(await crowdsale.crowdsaleInfo());

        this.crowdsale.hasEnded = await crowdsale.hasEnded();
        this.crowdsale.paused = await crowdsale.paused();
        this.crowdsale.isFinalized = await crowdsale.isFinalized();
        this.crowdsale.goalReached = await crowdsale.goalReached();
        this.crowdsale.round = await crowdsale.round();
        this.crowdsale.builder = await builder.crowdsaleCreators(this.crowdsale.address);

        if (this.crowdsale.paused ||
          !this.crowdsale.hasEnded ||
          this.crowdsale.isFinalized ||
          !this.crowdsale.goalReached ||
          this.crowdsale.round === 5 ||
          this.crowdsale.builder !== App.web3.eth.accounts[0]) {
          window.location.href = window.location.origin + '/not-found';
          return;
        }

        $('.crowdsale-box').toggleClass('d-none');
      },
      methods: {
        startCrowdsale: function () {
          if (!App.metamask.installed) {
            alert("To restart a Crowdsale please install the MetaMask extension!");
            return;
          } else {
            if (App.metamask.netId !== networkId) {
              alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
              return;
            }
          }

          this.$validator.validateAll().then(async (result) => {
            if (result) {
              if (!App.legacy) {
                await App.web3Provider.enable();
              }

              console.log('starting');
              const builder = await App.contracts.FriendsFingersBuilder.at(FriendsFingersBuilderAddress);

              const cap = App.web3.toWei(this.crowdsale.cap, "ether");
              const startTime = new Date(this.crowdsale.startTime).getTime() / 1000;
              const endTime = new Date(this.crowdsale.endTime).getTime() / 1000;
              const rate = new App.web3.BigNumber(this.crowdsale.rate);

              const crowdsaleInfo = JSON.stringify(this.crowdsale.projectInfo);

              try {
                this.txError = false;
                this.txHash = '';
                this.formDisabled = true;
                this.makingTransaction = true;

                const log = await builder.restartCrowdsale(
                  this.crowdsale.address,
                  cap,
                  startTime,
                  endTime,
                  rate,
                  crowdsaleInfo
                );

                console.log(log);

                this.txHash = log.tx;
                this.trxLink = App.etherscanLink + "/tx/" + this.txHash;

                await App.initCrowdsale();
                const event = log.logs.find(e => e.event === 'CrowdsaleStarted');

                if (typeof event === 'undefined') {
                  this.txError = true;
                  this.formDisabled = false;
                  alert("Some error occurred. Maybe transaction failed for some reasons. Check your transaction id.");
                  return;
                }

                const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(event.args.ffCrowdsale);

                this.crowdsale.address = crowdsale.address;
                this.crowdsale.id = parseInt(await crowdsale.id());

                this.crowdsaleLink = crowdsaleUrl + '?id=' + this.crowdsale.id;
                this.addressLink = App.etherscanLink + "/address/" +  this.crowdsale.address;
              } catch (e) {
                alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
                this.makingTransaction = false;
                this.formDisabled = false;
                console.log(e);
              }
            } else {
              console.log("some errors");
            }
          });
        }
      }
    });
  },

  viewCrowdsale: async function (crID) {
    await App.init();

    Vue.use(VeeValidate);

    new Vue({
      el: '#crowdsale-details',
      data: {
        demo: networkId !== "1",
        qrcodeVisible: false,
        copied: false,
        usAgreement: false,
        countryAgreement: false,
        globalAgreement: false,
        funds: 1,
        txHash: '',
        restartLink: '',
        isCrowdsaleOwner: false,
        makingTransaction: false,
        closingCrowdsale: false,
        crowdsaleAddress: 0,
        authenticated: true,
        crowdsale: {
          ffContract: true,
          cap: 0,
          goal: 0,
          weiRaised: 0,
          soldTokens: 0,
          rate: 0,
          startTime: 0,
          endTime: 0,
          hasStarted: false,
          hasEnded: true,
          paused: true,
          isFinalized: false,
          projectInfo: {}
        },
        token: {
          crowdsaleSupply: 0
        }
      },
      created: async function () {

        await App.initBuilder();
        await App.initCrowdsale();
        await App.initToken();

        const builder = await App.contracts.FriendsFingersBuilder.at(FriendsFingersBuilderAddress);

        this.crowdsaleAddress = await builder.crowdsaleList(crID);

        this.crowdsale.id = crID;

        if (parseInt(this.crowdsaleAddress) === 0) {
          window.location.href = window.location.origin + '/not-found';
          return;
        }

        const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(this.crowdsaleAddress);
        const token = await App.contracts.FriendsFingersToken.at(await crowdsale.token());

        this.token.address = token.address;
        this.token.name = await token.name();
        this.token.symbol = await token.symbol();
        this.token.decimals = (await token.decimals()).valueOf();

        this.crowdsale.address = crowdsale.address;
        this.crowdsale.cap = App.web3.fromWei(await crowdsale.cap()).valueOf();
        this.crowdsale.goal = App.web3.fromWei(await crowdsale.goal()).valueOf();
        this.crowdsale.weiRaised = App.web3.fromWei(await crowdsale.weiRaised()).valueOf();
        this.crowdsale.rate = (await crowdsale.rate()).valueOf();
        this.crowdsale.soldTokens = (App.web3.toWei(this.crowdsale.weiRaised) * this.crowdsale.rate) / Math.pow(10, this.token.decimals);
        this.crowdsale.startTime = (await crowdsale.startTime()).valueOf() * 1000;
        this.crowdsale.startTimeFormatted = new Date(this.crowdsale.startTime).toLocaleString();
        this.crowdsale.endTime = (await crowdsale.endTime()).valueOf() * 1000;
        this.crowdsale.endTimeFormatted = new Date(this.crowdsale.endTime).toLocaleString();
        this.crowdsale.projectInfo = JSON.parse(await crowdsale.crowdsaleInfo());
        this.crowdsale.hasStarted = Date.now() > this.crowdsale.startTime;
        this.crowdsale.hasEnded = await crowdsale.hasEnded();
        this.crowdsale.paused = await crowdsale.paused();

        this.token.crowdsaleSupply = this.crowdsale.cap * this.crowdsale.rate;

        $('.crowdsale-box').toggleClass('d-none');

        if (this.crowdsale.hasEnded) {
          this.crowdsale.builder = await builder.crowdsaleCreators(this.crowdsale.address);
          if (this.crowdsale.builder === App.web3.eth.accounts[0]) {
            this.isCrowdsaleOwner = true;
            this.crowdsale.isFinalized = await crowdsale.isFinalized();
            if (!this.crowdsale.isFinalized) {
              this.crowdsale.goalReached = await crowdsale.goalReached();
              if (this.crowdsale.goalReached) {
                this.crowdsale.round = parseInt((await crowdsale.round()).valueOf());
                if (this.crowdsale.round < 5) {
                  this.crowdsale.nextRoundId = parseInt((await crowdsale.nextRoundId()).valueOf());
                  if (this.crowdsale.nextRoundId === 0) {
                    this.restartLink = restartUrl + '?id=' + this.crowdsale.id;
                  }
                }
              }
            }
          }
        }

      },
      methods: {
        viewQRCode: function () {
          if (!this.qrcodeVisible) {
            const qr = document.getElementById("crowdsale-qrcode");
            new QRCode(qr, this.crowdsale.address);
            this.qrcodeVisible = true;
          }
        },
        copyAddress: function () {
          if (this.wallet !== '' && !this.address_error) {
            document.querySelector("#crowdsale-address").select();
            try {
              this.copied = document.execCommand("copy");
            } catch (err) {
              this.copied = false;
            }
          }
        },
        fundCrowdsale: async function () {
          if (!App.metamask.installed) {
            alert("To use the invest button please install the MetaMask extension!");
            return;
          } else {
            if (App.metamask.netId !== networkId) {
              alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
              return;
            }
          }

          if (!App.legacy) {
            await App.web3Provider.enable();
          }

          this.$validator.validateAll().then(async (result) => {

            if (result) {
              const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(this.crowdsaleAddress);
              const value = App.web3.toWei(this.funds);
              try {
                this.txHash = '';
                this.makingTransaction = true;
                const log = await crowdsale.send(value);

                console.log(log);

                this.txHash = log.tx;
                this.trxLink = App.etherscanLink + "/tx/" + this.txHash;
              } catch (e) {
                alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
                this.makingTransaction = false;
                console.log(e);
              }
            } else {
              console.log("some errors");
            }
          });
        },
        finalizeCrowdsale: async function () {
          if (!App.metamask.installed) {
            alert("To finalize please install the MetaMask extension!");
            return;
          } else {
            if (App.metamask.netId !== networkId) {
              alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
              return;
            }
          }

          const builder = await App.contracts.FriendsFingersBuilder.at(FriendsFingersBuilderAddress);

          try {
            this.txHash = '';
            this.closingCrowdsale = true;
            const log = await builder.closeCrowdsale(this.crowdsale.address);

            console.log(log);

            this.txHash = log.tx;
            this.trxLink = App.etherscanLink + "/tx/" + this.txHash;
          } catch (e) {
            alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
            this.closingCrowdsale = false;
            console.log(e);
          }
        }
      },
      computed: {
        rate: function () {
          return this.crowdsale.rate;
        }
      }
    });
  },

  shakaTokenSale: async function (crowdsaleAddress) {
    await App.init();

    Vue.use(VeeValidate);

    new Vue({
      el: '#crowdsale-details',
      data: {
        demo: networkId !== "1",
        qrcodeVisible: false,
        copied: false,
        usAgreement: false,
        countryAgreement: false,
        globalAgreement: false,
        funds: 1,
        txHash: '',
        trxLink: '',
        restartLink: '',
        isCrowdsaleOwner: false,
        makingTransaction: false,
        closingCrowdsale: false,
        authenticated: true,
        crowdsale: {
          ffContract: true,
          cap: 0,
          goal: 0,
          weiRaised: 0,
          soldTokens: 0,
          rate: 0,
          startTime: 0,
          endTime: 0,
          hasStarted: false,
          hasEnded: true,
          paused: true,
          projectInfo: {}
        },
        token: {
          crowdsaleSupply: 0
        }
      },
      created: async function () {

        await App.initBuilder();
        await App.initCrowdsale();
        await App.initToken();

        const builder = await App.contracts.FriendsFingersBuilder.at(FriendsFingersBuilderAddress);

        const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
        const token = await App.contracts.FriendsFingersToken.at(await crowdsale.token());

        this.crowdsale.id = 1;

        this.token.address = token.address;
        this.token.name = "Shaka";
        this.token.symbol = "HAK";
        this.token.decimals = 18;

        this.crowdsale.address = crowdsale.address;
        this.crowdsale.cap = 2000;
        this.crowdsale.goal = 0;
        this.crowdsale.weiRaised = App.web3.fromWei(await crowdsale.weiRaised()).valueOf();
        this.crowdsale.rate = 4800;
        this.crowdsale.soldTokens = (App.web3.toWei(this.crowdsale.weiRaised) * this.crowdsale.rate) / Math.pow(10, this.token.decimals);
        this.crowdsale.startTime = 1519470000 * 1000;
        this.crowdsale.startTimeFormatted = new Date(this.crowdsale.startTime).toLocaleString();
        this.crowdsale.endTime = 1521889200 * 1000;
        this.crowdsale.endTimeFormatted = new Date(this.crowdsale.endTime).toLocaleString();
        this.crowdsale.projectInfo = JSON.parse(await crowdsale.crowdsaleInfo());
        this.crowdsale.hasStarted = Date.now() > this.crowdsale.startTime;
        this.crowdsale.hasEnded = await crowdsale.hasEnded();
        this.crowdsale.paused = await crowdsale.paused();

        this.token.crowdsaleSupply = this.crowdsale.cap * this.crowdsale.rate;

        $('.crowdsale-box').toggleClass('d-none');

        if (this.crowdsale.hasEnded) {
          this.crowdsale.builder = await builder.crowdsaleCreators(this.crowdsale.address);
          if (this.crowdsale.builder === App.web3.eth.accounts[0]) {
            this.isCrowdsaleOwner = true;
            this.crowdsale.isFinalized = await crowdsale.isFinalized();
            if (!this.crowdsale.isFinalized) {
              this.crowdsale.goalReached = await crowdsale.goalReached();
              if (this.crowdsale.goalReached) {
                this.crowdsale.round = parseInt((await crowdsale.round()).valueOf());
                if (this.crowdsale.round < 5) {
                  this.crowdsale.nextRoundId = parseInt((await crowdsale.nextRoundId()).valueOf());
                  if (this.crowdsale.nextRoundId === 0) {
                    this.restartLink = restartUrl + '?id=' + this.crowdsale.id;
                  }
                }
              }
            }
          }
        }
      },
      methods: {
        viewQRCode: function () {
          if (!this.qrcodeVisible) {
            const qr = document.getElementById("crowdsale-qrcode");
            new QRCode(qr, this.crowdsale.address);
            this.qrcodeVisible = true;
          }
        },
        copyAddress: function () {
          if (this.wallet !== '' && !this.address_error) {
            document.querySelector("#crowdsale-address").select();
            try {
              this.copied = document.execCommand("copy");
            } catch (err) {
              this.copied = false;
            }
          }
        },
        fundCrowdsale: async function () {
          if (!App.metamask.installed) {
            alert("To use the invest button please install the MetaMask extension!");
            return;
          } else {
            if (App.metamask.netId !== networkId) {
              alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
              return;
            }
          }

          if (!App.legacy) {
            await App.web3Provider.enable();
          }

          this.$validator.validateAll().then(async (result) => {

            if (result) {
              const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
              const value = App.web3.toWei(this.funds);
              try {
                this.txHash = '';
                this.makingTransaction = true;
                const log = await crowdsale.send(value);

                console.log(log);

                this.txHash = log.tx;
                this.trxLink = App.etherscanLink + "/tx/" + this.txHash;
              } catch (e) {
                alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
                this.makingTransaction = false;
                console.log(e);
              }
            } else {
              console.log("some errors");
            }
          });
        },
        finalizeCrowdsale: function () {}
      },
      computed: {
        rate: function () {
          return this.crowdsale.rate;
        }
      }
    });
  },

  forkTokenSale: async function (page) {
    await App.init();

    const forkAddresses = {
      'ico/fork-ico': '0x4Ec0CB5c73A9Ed73EA821806f2701b29E6E44F0d',
    };

    const forkStartTimes = {
      'ico/fork-ico': 1552906800,
    };

    const forkEndTimes = {
      'ico/fork-ico': 1561888800,
    };

    const crowdsaleAddress = forkAddresses[page];

    Vue.use(VeeValidate);

    new Vue({
      el: '#crowdsale-details',
      data: {
        demo: networkId !== "1",
        qrcodeVisible: false,
        copied: false,
        usAgreement: false,
        countryAgreement: false,
        globalAgreement: false,
        funds: 1,
        txHash: '',
        trxLink: '',
        restartLink: '',
        isCrowdsaleOwner: false,
        makingTransaction: false,
        closingCrowdsale: false,
        yourPassword: '',
        crowdsale: {
          password: '',
          isTokenCappedCrowdsale: true,
          minimumContribution: 0.1,
          tokenCap: 50000000,
          cap: 0,
          goal: 0,
          weiRaised: 0,
          soldTokens: 0,
          rate: 0,
          startTime: forkStartTimes[page] * 1000,
          endTime: forkEndTimes[page] * 1000,
          hasStarted: false,
          hasEnded: true,
          paused: true,
          projectInfo: {},
        },
        token: {
          crowdsaleSupply: 0
        }
      },
      created: async function () {

        await App.initCrowdsale('gastroadvisor/ForkTokenSale.json');
        await App.initToken('gastroadvisor/GastroAdvisorToken.json');

        const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
        const token = await App.contracts.FriendsFingersToken.at(await crowdsale.token());

        this.crowdsale.id = 1;

        this.token.address = token.address;
        this.token.name = "GastroAdvisorToken";
        this.token.symbol = "FORK";
        this.token.decimals = 18;

        this.crowdsale.address = crowdsale.address;
        this.crowdsale.goal = 0;
        this.crowdsale.weiRaised = App.web3.fromWei(await crowdsale.weiRaised()).valueOf();
        this.crowdsale.cap = App.web3.fromWei(await crowdsale.cap()).valueOf();
        this.crowdsale.soldTokens = App.web3.fromWei(await crowdsale.soldTokens()).valueOf();
        this.crowdsale.startTimeFormatted = new Date(this.crowdsale.startTime).toLocaleString();
        this.crowdsale.endTimeFormatted = new Date(this.crowdsale.endTime).toLocaleString();
        this.crowdsale.projectInfo = {
          logo: '/img/icos/gastroadvisor/gastroadvisor-logo.jpg',
          title: 'GastroAdvisor',
          about: 'Make your food experience better',
          description: 'GastroAdvisor is building the first global recommendation platform for restaurants and dining venues based on blockchain Ethereum. GastroAdvisor connects restaurants and customers through FORK token, rewarding users for their contributions and creating a reliable platform for informations and reviews of restaurants around the world.',
          email: 'info@gastroadvisor.com',
          url: 'https://www.gastroadvisor.com',
          whitepaper: 'https://www.gastroadvisor.com/whitepaper.pdf',
          facebook: 'https://www.facebook.com/GastroAdvisor',
          twitter: 'https://twitter.com/gastroadvisor',
          instagram: 'https://www.instagram.com/GastroAdvisor_Official_ICO',
          telegram: 'https://t.me/GastroAdvisorOfficial',
          medium: 'https://medium.com/gastroadvisor-official',
          github: 'https://github.com/GastroAdvisor',
          youtube: 'https://www.youtube.com/channel/UCfvle9ZLVsNdzrpp7I4EvhA/featured',
        };

        this.crowdsale.projectInfo.description = this.crowdsale.projectInfo.description + '<br><br>Minimum contribution: 0.1 ETH<br><br><a href="https://www.gastroadvisor.com/blog-gastroadvisor/new-ico-announcement/" target="_blank">Discover more</a>';

        this.crowdsale.rate = (await crowdsale.rate()).valueOf();
        this.crowdsale.hasStarted = Date.now() > this.crowdsale.startTime;
        this.crowdsale.hasEnded = await crowdsale.ended();
        this.crowdsale.paused = false;

        this.token.crowdsaleSupply = this.crowdsale.tokenCap;

        $('.crowdsale-box').toggleClass('d-none');
      },
      methods: {
        viewQRCode: function () {
          if (!this.qrcodeVisible) {
            const qr = document.getElementById("crowdsale-qrcode");
            new QRCode(qr, this.crowdsale.address);
            this.qrcodeVisible = true;
          }
        },
        copyAddress: function () {
          if (this.wallet !== '' && !this.address_error) {
            document.querySelector("#crowdsale-address").select();
            try {
              this.copied = document.execCommand("copy");
            } catch (err) {
              this.copied = false;
            }
          }
        },
        fundCrowdsale: async function () {
          if (!App.metamask.installed) {
            alert("To use the invest button please install the MetaMask extension!");
            return;
          } else {
            if (App.metamask.netId !== networkId) {
              alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
              return;
            }
          }

          if (!App.legacy) {
            await App.web3Provider.enable();
          }

          this.$validator.validateAll().then(async (result) => {

            if (result) {
              const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
              const value = App.web3.toWei(this.funds);
              try {
                this.txHash = '';
                this.makingTransaction = true;
                const log = await crowdsale.send(value);

                console.log(log);

                this.txHash = log.tx;
                this.trxLink = App.etherscanLink + "/tx/" + this.txHash;
              } catch (e) {
                alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
                this.makingTransaction = false;
                console.log(e);
              }
            } else {
              console.log("some errors");
            }
          });
        },
        finalizeCrowdsale: function () {
          console.log('does nothing');
        }
      },
      computed: {
        authenticated: function () {
          return this.crowdsale.password ? this.crowdsale.password && this.yourPassword.toLowerCase() === this.crowdsale.password.toLowerCase() : true;
        },
        rate: function () {
          return this.crowdsale.rate;
        }
      }
    });
  }
};

(function($) {
  "use strict";

  let crowdsaleId = 0;

  switch (page) {
    case "bounty-program":
      App.bountyProgram();
      break;

    case "ico/fork-ico":
      App.forkTokenSale(page);
      break;

    case "crowdsale-builder-demo":
      App.setTestnet();
      App.builder();
      break;

    case "crowdsale-demo":
      App.setTestnet();
      crowdsaleId = getParam('id');
      if ($.isNumeric(crowdsaleId)) {
        App.viewCrowdsale(crowdsaleId);
      } else {
        window.location.href = window.location.origin + '/not-found';
      }

      break;

    case "restart-crowdsale-demo":
      App.setTestnet();
      crowdsaleId = getParam('id');
      if ($.isNumeric(crowdsaleId)) {
        App.restart(crowdsaleId);
      } else {
        window.location.href = window.location.origin + '/not-found';
      }

      break;

    case "crowdsale-builder":
      App.builder();
      break;

    case "crowdsale":
      crowdsaleId = getParam('id');
      if ($.isNumeric(crowdsaleId)) {
        App.viewCrowdsale(crowdsaleId);
      } else {
        window.location.href = window.location.origin + '/not-found';
      }

      break;

    case "restart-crowdsale":
      crowdsaleId = getParam('id');
      if ($.isNumeric(crowdsaleId)) {
        App.restart(crowdsaleId);
      } else {
        window.location.href = window.location.origin + '/not-found';
      }

      break;

    case "": //home
      App.home(FriendsFingersTokenSaleAddress);
      break;
  }

})(jQuery); // End of use strict

function getParam (param) {
  const vars = {};
  window.location.href.replace( location.hash, '' ).replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if (param) {
    return vars[param] ? vars[param] : null;
  }
  return vars;
}
