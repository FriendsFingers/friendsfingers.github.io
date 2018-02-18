var App = {
    web3: null,
    web3Provider: null,
    contracts: {},

    init: function () {
        App.initWeb3();
    },

    initWeb3: function () {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            App.web3 = new Web3(App.web3Provider);
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider(web3Provider);
            App.web3 = new Web3(App.web3Provider);
        }

        App.web3.version.getNetwork(function (err, netId) {
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

    viewCrowdsale: async function (crowdsaleAddress) {
        App.init();

        Vue.use(VeeValidate);
        await App.initCrowdsale();
        await App.initToken();

        new Vue({
            el: '#crowdsale-details',
            data: {
                qrcodeVisible: false,
                copied: false,
                usAgreement: false,
                chinaAgreement: false,
                countryAgreement: false,
                globalAgreement: false,
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
                const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
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
                this.crowdsale.investorCount = (await crowdsale.investorCount()).valueOf();
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
            },
            methods: {
                viewQRCode: function () {
                    if (!this.qrcodeVisible) {
                        var qr = document.getElementById("crowdsale-qrcode");
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
                    this.$validator.validateAll().then(async (result) => {

                        if (result) {
                            const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
                            const value = App.web3.toWei(this.funds);
                            const log = await crowdsale.send(value);
                            console.log(log);
                            alert("Tx id: " + log.tx);
                        } else {
                            console.log("some errors");
                        }
                    });
                }
            }
        });
    }
};

(function($) {
    "use strict"; // Start of use strict

    switch (page) {
        case "bounty-program":
            App.bountyProgram();
            break;

        case "crowdsale":
            const pathArray = window.location.pathname.split( '/' );
            if (typeof pathArray[2] !== "undefined" && pathArray[2] !== '') {
                App.viewCrowdsale(pathArray[2]);
            } else {
                window.location.href = window.location.origin + '/not-found';
            }
            break;
    }

})(jQuery); // End of use strict