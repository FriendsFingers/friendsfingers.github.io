App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        App.initWeb3();
    },

    initWeb3: function () {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(App.web3Provider);
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider(web3Provider);
            web3 = new Web3(App.web3Provider);
        }

        web3.version.getNetwork(function (err, netId) {
            switch (netId) {
                case "1":
                    console.log('This is mainnet');
                    break;
                case "2":
                    console.log('This is the deprecated Morden test network.');
                    break;
                case "3":
                    console.log('This is the ropsten test network.');
                    break;
                case "4":
                    console.log('This is the rinkeby test network.');
                    break;
                default:
                    console.log('This is an unknown network.');
            }
        });
    },

    initBuilder: async function () {
        return await $.getJSON(abiPath + 'FriendsFingersBuilder.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            App.contracts.FriendsFingersBuilder = TruffleContract(data);

            // Set the provider for our contract.
            App.contracts.FriendsFingersBuilder.setProvider(App.web3Provider);
        });
    },

    initCrowdsale: async function () {
        return await $.getJSON(abiPath + 'FriendsFingersCrowdsale.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            App.contracts.FriendsFingersCrowdsale = TruffleContract(data);

            // Set the provider for our contract.
            App.contracts.FriendsFingersCrowdsale.setProvider(App.web3Provider);
        });
    },

    initToken: async function () {
        return $.getJSON(abiPath + 'FriendsFingersToken.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            App.contracts.FriendsFingersToken = TruffleContract(data);

            // Set the provider for our contract.
            App.contracts.FriendsFingersToken.setProvider(App.web3Provider);
        });
    },

    bountyProgram: async function () {
        App.init();

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
                    this.address_error = (this.wallet !== '' && !web3.isAddress(this.wallet));

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
                    this.address_error = (this.wallet !== '' && !web3.isAddress(this.wallet));
                    return (this.wallet === '' || this.address_error) ? '' : "https://www.friendsfingers.com/?utm_campaign=bounty&utm_source=" + this.wallet;
                }
            }
        });
    },

    viewCrowdsale: async function (crowdsaleAddress) {
        App.init();

        Vue.use(VeeValidate);
        await App.initCrowdsale();
        await App.initToken();

        new Vue({
            el: '#crowdsale-details',
            data: {
                funds: 1,
                crowdsale: {
                    cap: 0,
                    goal: 0,
                    weiRaised: 0,
                    soldTokens: 0,
                    rate: 0,
                    investorCount: 0,
                    startTime: 0,
                    endTime: 0,
                    projectInfo: {}
                },
                token: {
                    crowdsaleSupply: 0,
                    friendsFingersSupply: 0,
                    maxSupply: 0,
                    totalSupply: 0
                }
            },
            created: async function () {
                const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
                const token = await App.contracts.FriendsFingersToken.at(await crowdsale.token());

                this.token.address = token.address;
                this.token.name = await token.name();
                this.token.symbol = await token.symbol();
                this.token.decimals = (await token.decimals()).valueOf();
                this.token.totalSupply = (await token.totalSupply()) / Math.pow(10, this.token.decimals);

                this.crowdsale.address = crowdsale.address;
                this.crowdsale.cap = web3.fromWei(await crowdsale.cap()).valueOf();
                this.crowdsale.goal = web3.fromWei(await crowdsale.goal()).valueOf();
                this.crowdsale.weiRaised = web3.fromWei(await crowdsale.weiRaised()).valueOf();
                this.crowdsale.rate = (await crowdsale.rate()).valueOf();
                this.crowdsale.soldTokens = (await crowdsale.soldTokens()) / Math.pow(10, this.token.decimals);
                this.crowdsale.investorCount = (await crowdsale.investorCount()).valueOf();
                this.crowdsale.startTime = (await crowdsale.startTime()).valueOf() * 1000;
                this.crowdsale.startTimeFormatted = new Date(this.crowdsale.startTime).toLocaleString();
                this.crowdsale.endTime = (await crowdsale.endTime()).valueOf() * 1000;
                this.crowdsale.endTimeFormatted = new Date(this.crowdsale.endTime).toLocaleString();
                this.crowdsale.projectInfo = JSON.parse(await crowdsale.crowdsaleInfo());
                this.crowdsale.friendsFingersRatePerMille = (await crowdsale.friendsFingersRatePerMille()).valueOf();

                this.token.crowdsaleSupply = this.crowdsale.cap * this.crowdsale.rate;

                $('.crowdsale-box').toggleClass('d-none');
            },
            methods: {
                fundCrowdsale: async function () {
                    this.$validator.validateAll().then(async (result) => {

                        if (result) {
                            const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
                            const value = web3.toWei(this.funds);
                            const result = await crowdsale.send(value);
                            console.log(result);
                        } else {
                            console.log("some errors");
                        }
                    });
                }
            }
        });
    }
};